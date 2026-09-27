#!/usr/bin/env python3
"""Synthetic cubical-topology checks for IRL."""

from __future__ import annotations
import math

NEIGHBORS=((1,0,0),(-1,0,0),(0,1,0),(0,-1,0),(0,0,1),(0,0,-1))

def connected_components(voxels):
    seen=set(); count=0
    for seed in voxels:
        if seed in seen: continue
        count+=1; stack=[seed]; seen.add(seed)
        while stack:
            i,j,k=stack.pop()
            for di,dj,dk in NEIGHBORS:
                q=(i+di,j+dj,k+dk)
                if q in voxels and q not in seen:
                    seen.add(q); stack.append(q)
    return count

def euler_characteristic(voxels):
    vertices=set(); edges=set(); faces=set()
    for i,j,k in voxels:
        for dx in (0,1):
            for dy in (0,1):
                for dz in (0,1):
                    vertices.add((i+dx,j+dy,k+dz))
        for dy in (0,1):
            for dz in (0,1):
                edges.add(("x",i,j+dy,k+dz))
        for dx in (0,1):
            for dz in (0,1):
                edges.add(("y",i+dx,j,k+dz))
        for dx in (0,1):
            for dy in (0,1):
                edges.add(("z",i+dx,j+dy,k))
        for dz in (0,1):
            faces.add(("xy",i,j,k+dz))
        for dy in (0,1):
            faces.add(("xz",i,j+dy,k))
        for dx in (0,1):
            faces.add(("yz",i+dx,j,k))
    return len(vertices)-len(edges)+len(faces)-len(voxels)

def bounded_complement_components(voxels,pad=2):
    xs=[v[0] for v in voxels]; ys=[v[1] for v in voxels]; zs=[v[2] for v in voxels]
    xmin,xmax=min(xs)-pad,max(xs)+pad
    ymin,ymax=min(ys)-pad,max(ys)+pad
    zmin,zmax=min(zs)-pad,max(zs)+pad
    comp={(i,j,k) for i in range(xmin,xmax+1) for j in range(ymin,ymax+1) for k in range(zmin,zmax+1) if (i,j,k) not in voxels}
    seen=set(); bounded=0
    def boundary(q):
        i,j,k=q
        return i in (xmin,xmax) or j in (ymin,ymax) or k in (zmin,zmax)
    for seed in comp:
        if seed in seen: continue
        stack=[seed]; seen.add(seed); touches=False
        while stack:
            q=stack.pop(); touches=touches or boundary(q)
            i,j,k=q
            for di,dj,dk in NEIGHBORS:
                n=(i+di,j+dj,k+dk)
                if xmin<=n[0]<=xmax and ymin<=n[1]<=ymax and zmin<=n[2]<=zmax and n in comp and n not in seen:
                    seen.add(n); stack.append(n)
        if not touches: bounded+=1
    return bounded

def betti_numbers(voxels):
    b0=connected_components(voxels)
    chi=euler_characteristic(voxels)
    b2=bounded_complement_components(voxels)
    b1=b0+b2-chi
    return b0,b1,b2,chi

def solid_block(n=4):
    return {(i,j,k) for i in range(n) for j in range(n) for k in range(n)}

def two_blocks():
    a=solid_block(4)
    return a|{(i+7,j,k) for i,j,k in a}

def hollow_shell(n=5):
    return {(i,j,k) for i in range(n) for j in range(n) for k in range(n) if not (1<=i<=n-2 and 1<=j<=n-2 and 1<=k<=n-2)}

def solid_torus(n=31,major=8.0,minor=3.0):
    c=(n-1)/2; voxels=set()
    for i in range(n):
        for j in range(n):
            for k in range(n):
                x,y,z=i-c,j-c,k-c
                if (math.sqrt(x*x+y*y)-major)**2+z*z<=minor**2:
                    voxels.add((i,j,k))
    return voxels

CASES=[
    ("solid_block",solid_block(),(1,0,0)),
    ("two_components",two_blocks(),(2,0,0)),
    ("hollow_shell",hollow_shell(),(1,0,1)),
    ("solid_torus",solid_torus(),(1,1,0)),
]

def main():
    failures=[]
    print("IRL synthetic cubical-topology benchmark")
    for name,voxels,expected in CASES:
        b0,b1,b2,chi=betti_numbers(voxels)
        got=(b0,b1,b2); ok=got==expected
        print(f"{name:16s} voxels={len(voxels):5d} beta={got} chi={chi:2d} expected={expected} {'PASS' if ok else 'FAIL'}")
        if not ok: failures.append((name,got,expected))
    if failures:
        raise SystemExit(f"Topology benchmark failures: {failures}")
    print("All synthetic topology cases passed.")

if __name__=="__main__":
    main()
