"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { buildFormation, type Formation } from "./formations";
import { subscribeFormation } from "./stageBus";

const COUNT = 4200;
const MORPH_MS = 1500;

const VERT = /* glsl */ `
  attribute vec3 aFrom;
  attribute vec3 aTo;
  attribute float aSeed;
  uniform float uMix;
  uniform float uTime;
  uniform vec2  uMouse;
  uniform float uSize;
  varying float vSeed;
  varying float vAlpha;

  void main() {
    vSeed = aSeed;
    vec3 p = mix(aFrom, aTo, uMix);

    // constant slow drift so the field never looks frozen
    float t = uTime * 0.17 + aSeed * 6.2831853;
    p.x += sin(t) * 0.07;
    p.y += cos(t * 1.27) * 0.07;
    p.z += sin(t * 0.73) * 0.07;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);

    // cursor pushes the field apart
    vec2 d = mv.xy - uMouse;
    float push = smoothstep(1.7, 0.0, length(d)) * 0.55;
    mv.xy += normalize(d + vec2(0.0001)) * push;

    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * (0.6 + aSeed * 0.9) * (260.0 / max(0.001, -mv.z));
    vAlpha = 0.20 + 0.50 * aSeed;
  }
`;

const FRAG = /* glsl */ `
  precision mediump float;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uOpacity;
  varying float vSeed;
  varying float vAlpha;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.18, d) * vAlpha * uOpacity;
    vec3 col = mix(uColorA, uColorB, smoothstep(0.74, 0.99, vSeed));
    gl_FragColor = vec4(col, a);
  }
`;

const ease = (t: number) => 1 - Math.pow(1 - t, 3);

export default function Stage() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    if (document.documentElement.hasAttribute("data-still")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let gl: THREE.WebGLRenderer;
    try {
      gl = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "low-power" });
    } catch {
      return; // no WebGL — the CSS fallback underneath stays visible
    }

    gl.setClearAlpha(0);
    el.appendChild(gl.domElement);
    Object.assign(gl.domElement.style, { width: "100%", height: "100%", display: "block" });

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 8.4;

    const geo = new THREE.BufferGeometry();
    const from = buildFormation("orb", COUNT);
    const seeds = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) seeds[i] = (Math.sin(i * 12.9898) * 43758.5453) % 1;
    for (let i = 0; i < COUNT; i++) seeds[i] = Math.abs(seeds[i]);

    geo.setAttribute("position", new THREE.BufferAttribute(from.slice(), 3));
    geo.setAttribute("aFrom", new THREE.BufferAttribute(from.slice(), 3));
    geo.setAttribute("aTo", new THREE.BufferAttribute(from.slice(), 3));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));

    const uniforms = {
      uMix: { value: 1 },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(999, 999) },
      uSize: { value: 0.09 },
      uOpacity: { value: 0 },
      uColorA: { value: new THREE.Color("#51942A") },
      uColorB: { value: new THREE.Color("#F2B705") },
    };

    const points = new THREE.Points(
      geo,
      new THREE.ShaderMaterial({
        uniforms, vertexShader: VERT, fragmentShader: FRAG,
        transparent: true, depthTest: false, depthWrite: false,
      }),
    );
    scene.add(points);

    // ---- sizing: never render into a zero box ----------------------------
    let w = 0, h = 0;
    const resize = () => {
      const r = el.getBoundingClientRect();
      const nw = Math.max(1, Math.round(r.width));
      const nh = Math.max(1, Math.round(r.height));
      if (nw === w && nh === h) return;
      w = nw; h = nh;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      gl.setPixelRatio(dpr);
      gl.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      // gl_PointSize is in drawing-buffer px, so track the pixel ratio
      uniforms.uSize.value = (w < 760 ? 0.075 : 0.095) * dpr;
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();

    // ---- morphing --------------------------------------------------------
    let morphStart = -1;
    const aFrom = geo.getAttribute("aFrom") as THREE.BufferAttribute;
    const aTo = geo.getAttribute("aTo") as THREE.BufferAttribute;

    const goTo = (name: Formation) => {
      const cur = aFrom.array as Float32Array;
      const tgt = aTo.array as Float32Array;
      const m = uniforms.uMix.value;
      // freeze wherever the field currently is, then grow toward the new shape
      for (let i = 0; i < cur.length; i++) cur[i] = cur[i] + (tgt[i] - cur[i]) * m;
      (aTo.array as Float32Array).set(buildFormation(name, COUNT));
      aFrom.needsUpdate = true;
      aTo.needsUpdate = true;
      uniforms.uMix.value = 0;
      morphStart = performance.now();
    };
    const unsub = subscribeFormation(goTo);

    // ---- cursor ----------------------------------------------------------
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const ny = -(((e.clientY - r.top) / r.height) * 2 - 1);
      uniforms.uMouse.value.set(nx * 4.4 * camera.aspect, ny * 4.4);
    };
    const onLeave = () => uniforms.uMouse.value.set(999, 999);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    // ---- loop ------------------------------------------------------------
    let raf = 0;
    const t0 = performance.now();
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      uniforms.uTime.value = (now - t0) / 1000;
      uniforms.uOpacity.value = Math.min(0.85, uniforms.uOpacity.value + 0.02); // fade in, stays under the type
      if (morphStart > 0) {
        const k = Math.min(1, (now - morphStart) / MORPH_MS);
        uniforms.uMix.value = ease(k);
        if (k === 1) morphStart = -1;
      }
      points.rotation.y = Math.sin(uniforms.uTime.value * 0.07) * 0.22;
      points.rotation.x = Math.cos(uniforms.uTime.value * 0.05) * 0.1;
      if (w > 1 && h > 1) gl.render(scene, camera);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      unsub();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      geo.dispose();
      points.material.dispose();
      gl.dispose();
      el.removeChild(gl.domElement);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* painted ground + CSS fallback if WebGL is unavailable or frozen */}
      <div className="absolute inset-0 bg-canvas" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(58% 48% at 50% 38%, rgba(242,183,5,.11) 0%, rgba(242,183,5,0) 62%)," +
            "radial-gradient(52% 46% at 22% 72%, rgba(110,170,50,.10) 0%, rgba(110,170,50,0) 65%)",
        }}
      />
      <div ref={host} className="absolute inset-0" />
      <div className="absolute inset-0 field-grid field-fade opacity-60" />
    </div>
  );
}
