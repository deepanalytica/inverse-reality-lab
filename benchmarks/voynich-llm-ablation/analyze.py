#!/usr/bin/env python3
"""IRL-ADV-002 reproducible descriptive analysis.

Input: JSONL with one adjudicated record per response.
No third-party dependencies.
"""
from __future__ import annotations
import argparse
import json
import math
import random
import statistics
from collections import defaultdict

SCORE_FIELDS = [
    "accuracy",
    "traceability",
    "falsification",
    "hypothesis_control",
    "calibration",
    "error_detection",
]

def clip(x, lo=0.0, hi=1.0):
    return max(lo, min(hi, x))

def ucr(r):
    nums = [
        r.get("n_obs", 0),
        r.get("n_derived", 0),
        r.get("n_hypothesis", 0),
        r.get("n_unsupported", 0),
        r.get("n_error", 0),
    ]
    den = sum(nums)
    if not den:
        return None
    return (r.get("n_unsupported", 0) + r.get("n_error", 0)) / den

def ers(r):
    vals = {k: float(r[k]) / 4.0 for k in SCORE_FIELDS}
    base = (
        0.25 * vals["accuracy"]
        + 0.20 * vals["traceability"]
        + 0.20 * vals["falsification"]
        + 0.15 * vals["hypothesis_control"]
        + 0.10 * vals["calibration"]
        + 0.10 * vals["error_detection"]
    )
    q = ucr(r)
    return base, clip(base - 0.25 * (q or 0.0))

def mean(xs):
    xs = [x for x in xs if x is not None]
    return statistics.mean(xs) if xs else None

def bootstrap_diff(by_task_a, by_task_b, n=10000, seed=20260930):
    common = sorted(set(by_task_a) & set(by_task_b))
    if not common:
        return None
    rng = random.Random(seed)
    diffs = []
    for _ in range(n):
        sample = [rng.choice(common) for _ in common]
        ds = []
        for t in sample:
            ds.append(mean(by_task_b[t]) - mean(by_task_a[t]))
        diffs.append(mean(ds))
    diffs.sort()
    lo = diffs[int(0.025 * (len(diffs)-1))]
    hi = diffs[int(0.975 * (len(diffs)-1))]
    return {"mean_diff": mean(diffs), "ci95": [lo, hi], "tasks": len(common)}

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("jsonl")
    ap.add_argument("--bootstrap", type=int, default=10000)
    args = ap.parse_args()

    rows = []
    with open(args.jsonl, "r", encoding="utf-8") as f:
        for line in f:
            if line.strip():
                r = json.loads(line)
                if not r.get("technical_failure", False):
                    rows.append(r)

    by_cond = defaultdict(list)
    for r in rows:
        r["_ucr"] = ucr(r)
        r["_ers"], r["_ers_adjusted"] = ers(r)
        by_cond[r["condition"]].append(r)

    summary = {}
    for c, rs in sorted(by_cond.items()):
        summary[c] = {
            "n": len(rs),
            "ucr": mean([r["_ucr"] for r in rs]),
            "ers": mean([r["_ers"] for r in rs]),
            "ers_adjusted": mean([r["_ers_adjusted"] for r in rs]),
            **{k: mean([float(r[k]) for r in rs]) for k in SCORE_FIELDS},
            "output_tokens": mean([r.get("output_tokens") for r in rs if r.get("output_tokens") is not None]),
            "latency_ms": mean([r.get("latency_ms") for r in rs if r.get("latency_ms") is not None]),
        }

    metrics = SCORE_FIELDS + ["_ucr", "_ers_adjusted"]
    comparisons = {}
    for a, b in [("A","B"),("B","C"),("A","C")]:
        key = f"{b}-{a}"
        comparisons[key] = {}
        for m in metrics:
            ta, tb = defaultdict(list), defaultdict(list)
            for r in by_cond.get(a, []):
                v = r.get(m)
                if v is not None:
                    ta[r["task_id"]].append(float(v))
            for r in by_cond.get(b, []):
                v = r.get(m)
                if v is not None:
                    tb[r["task_id"]].append(float(v))
            comparisons[key][m] = bootstrap_diff(ta, tb, args.bootstrap)

    print(json.dumps({
        "experiment_id": "IRL-ADV-002",
        "summary": summary,
        "paired_bootstrap": comparisons
    }, indent=2, ensure_ascii=False))

if __name__ == "__main__":
    main()
