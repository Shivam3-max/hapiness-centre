"""Trace the Happiness Centre logo raster into layered SVG paths.

No potrace/OpenCV available, so this does it directly:
  colour field -> box blur -> marching squares at sub-pixel precision
  -> Douglas-Peucker -> Catmull-Rom cubic beziers.
"""
import numpy as np
from PIL import Image

# marching-squares case table; edges are T=0 R=1 B=2 L=3
CASES = {
    1:[(3,0)], 2:[(0,1)], 3:[(3,1)], 4:[(1,2)], 5:[(3,0),(1,2)], 6:[(0,2)],
    7:[(3,2)], 8:[(2,3)], 9:[(2,0)], 10:[(0,1),(2,3)], 11:[(2,1)], 12:[(1,3)],
    13:[(1,0)], 14:[(0,3)],
}

def box_blur(f, r=1, passes=2):
    for _ in range(passes):
        p = np.pad(f, r, mode="edge")
        acc = np.zeros_like(f)
        for dy in range(-r, r+1):
            for dx in range(-r, r+1):
                acc += p[r+dy:r+dy+f.shape[0], r+dx:r+dx+f.shape[1]]
        f = acc / ((2*r+1)**2)
    return f

def contours(field, level=0.5):
    F = np.pad(field.astype(float), 1, constant_values=0.0)
    a, b = F[:-1, :-1], F[:-1, 1:]
    c, d = F[1:, 1:],  F[1:, :-1]
    idx = (a>level).astype(np.uint8) | ((b>level)<<1) | ((c>level)<<2) | ((d>level)<<3)
    ys, xs = np.nonzero((idx != 0) & (idx != 15))

    def pt(i, j, e):
        A,B,C,D = F[i,j], F[i,j+1], F[i+1,j+1], F[i+1,j]
        def lerp(p,q):
            den = q-p
            return 0.5 if abs(den) < 1e-12 else (level-p)/den
        if e==0: return (j+lerp(A,B), float(i))
        if e==1: return (float(j+1),  i+lerp(B,C))
        if e==2: return (j+lerp(D,C), float(i+1))
        return (float(j),             i+lerp(A,D))

    K = lambda p: (round(p[0],5), round(p[1],5))
    segs, start_map = [], {}
    for i, j in zip(ys, xs):
        for e0, e1 in CASES[int(idx[i,j])]:
            p, q = pt(i,j,e0), pt(i,j,e1)
            start_map.setdefault(K(p), []).append(len(segs))
            segs.append((K(p), K(q), q))

    used = [False]*len(segs)
    loops = []
    for i0 in range(len(segs)):
        if used[i0]: continue
        k0, loop, j, closed = segs[i0][0], [], i0, False
        while True:
            used[j] = True
            loop.append(segs[j][2])
            kend = segs[j][1]
            if kend == k0:
                closed = True; break
            nxt = [t for t in start_map.get(kend, ()) if not used[t]]
            if not nxt: break
            j = nxt[0]
        if closed and len(loop) > 8:
            loops.append([(x-1, y-1) for x, y in loop])   # undo the pad
    return loops

def rdp(pts, eps):
    if len(pts) < 3: return pts
    p0, p1 = np.array(pts[0]), np.array(pts[-1])
    seg = p1 - p0; L = np.hypot(*seg)
    P = np.array(pts)
    if L < 1e-9:
        d = np.hypot(*(P - p0).T)
    else:
        d = np.abs(np.cross(seg, P - p0)) / L
    i = int(d.argmax())
    if d[i] > eps:
        return rdp(pts[:i+1], eps)[:-1] + rdp(pts[i:], eps)
    return [pts[0], pts[-1]]

def to_bezier(pts, tension=1.0, dec=2):
    n = len(pts)
    f = lambda v: f"{round(v, dec):g}"
    out = [f"M{f(pts[0][0])} {f(pts[0][1])}"]
    for i in range(n):
        p0 = np.array(pts[(i-1) % n]); p1 = np.array(pts[i])
        p2 = np.array(pts[(i+1) % n]); p3 = np.array(pts[(i+2) % n])
        c1 = p1 + (p2-p0)/6*tension
        c2 = p2 - (p3-p1)/6*tension
        out.append(f"C{f(c1[0])} {f(c1[1])} {f(c2[0])} {f(c2[1])} {f(p2[0])} {f(p2[1])}")
    return "".join(out) + "Z"

def trace(path, layers, eps=0.6, min_area=40.0):
    im = Image.open(path).convert("RGB")
    a = np.asarray(im).astype(float)
    R, G, B = a[...,0], a[...,1], a[...,2]
    ink = np.clip((235.0 - a.min(axis=2)) / 55.0, 0, 1)      # 1 where saturated ink
    out = []
    for name, colour, want_dark, level in layers:
        tone = np.clip((125.0 - G)/22.0 + 0.5, 0, 1)          # 1 = dark green
        sel = ink * (tone if want_dark else (1.0 - tone))
        loops = contours(box_blur(sel, 1, 2), level)
        ds = []
        for lp in loops:
            s = rdp(lp, eps)
            if len(s) < 4: continue
            P = np.array(s)
            area = abs(np.dot(P[:,0], np.roll(P[:,1],-1)) - np.dot(P[:,1], np.roll(P[:,0],-1)))/2
            if area < min_area: continue
            ds.append(to_bezier(s))
        out.append((name, colour, ds))
        print(f"  {name:6s} {len(ds):3d} paths  ({sum(len(d) for d in ds)/1024:.1f} KB)")
    return im.size, out
