"""IRL adversarial identifiability / ablation study.

This is NOT a learned model and NOT a statistical validation.
It is a deterministic dependency audit of the five coarse IRL benchmarks.

Scores:
  2 = recoverable by the current rule set from the available modalities
  1 = favored / partially constrained, but alternatives remain
  0 = not recoverable from the available modalities

The modality requirements are explicit assumptions and are intended to be
challenged in future preregistered benchmarks.
"""
from itertools import combinations
from math import factorial
import random
import json

PROCESSES = {
    "Golden Gate": {
        "temporary aerial access": {
            "recover": {"geometry","environment","access"},
            "favor": {"geometry","environment"},
            "level": "functional-class"
        },
        "incremental cable formation": {
            "recover": {"geometry","microstructure","access"},
            "favor": {"geometry","microstructure"},
            "level": "mechanism-family"
        },
        "advancing tower lift support": {
            "recover": {"geometry","microstructure","logistics"},
            "favor": {"geometry","microstructure"},
            "level": "functional-class"
        },
        "balanced deck erection": {
            "recover": {"geometry","structure","precision"},
            "favor": {"geometry","structure"},
            "level": "functional-class"
        },
    },
    "Eiffel Tower": {
        "modular incremental assembly": {
            "recover": {"microstructure","structure"},
            "favor": {"microstructure"},
            "level": "functional-class"
        },
        "precision prefabrication": {
            "recover": {"microstructure","precision","logistics"},
            "favor": {"microstructure","precision"},
            "level": "functional-class"
        },
        "advancing lifting system": {
            "recover": {"geometry","microstructure","logistics"},
            "favor": {"geometry","microstructure"},
            "level": "functional-class"
        },
        "temporary adjustable closure support": {
            "recover": {"geometry","structure","precision"},
            "favor": {"geometry","precision"},
            "level": "functional-class"
        },
        "temporary fastening": {
            "recover": {"microstructure","precision"},
            "favor": {"microstructure"},
            "level": "functional-class"
        },
    },
    "Hoover Dam": {
        "temporary hydraulic bypass/isolation": {
            "recover": {"geometry","environment","hydrology"},
            "favor": {"geometry","hydrology"},
            "level": "functional-class"
        },
        "segmented mass-concrete placement": {
            "recover": {"geometry","material","thermal"},
            "favor": {"geometry","material"},
            "level": "functional-class"
        },
        "active embedded cooling": {
            "recover": {"material","thermal","schedule"},
            "favor": {"material","thermal"},
            "level": "functional-class"
        },
        "post-cooling joint integration": {
            "recover": {"microstructure","material","thermal"},
            "favor": {"microstructure","material"},
            "level": "functional-class"
        },
        "aerial canyon delivery": {
            "recover": {"geometry","environment","logistics"},
            "favor": {"geometry","environment"},
            "level": "functional-class"
        },
    },
    "Empire State": {
        "modular steel erection": {
            "recover": {"microstructure","structure"},
            "favor": {"microstructure"},
            "level": "functional-class"
        },
        "external buffer/JIT": {
            "recover": {"environment","logistics","schedule"},
            "favor": {"environment","logistics"},
            "level": "functional-class"
        },
        "overlapping vertical pipeline": {
            "recover": {"geometry","schedule","logistics"},
            "favor": {"geometry","schedule"},
            "level": "functional-class"
        },
        "jumping derricks": {
            "recover": {"geometry","logistics","access"},
            "favor": {"geometry","logistics"},
            "level": "functional-class"
        },
        "column-shortening control": {
            "recover": {"geometry","structure","precision"},
            "favor": {"geometry","structure"},
            "level": "functional-class"
        },
    },
    "Sydney Opera House": {
        "shared geometric generator": {
            "recover": {"geometry"},
            "favor": {"geometry"},
            "level": "geometric-class"
        },
        "reusable mould/prefabrication": {
            "recover": {"geometry","microstructure","logistics"},
            "favor": {"geometry","microstructure"},
            "level": "functional-class"
        },
        "segmental continuity/prestress class": {
            "recover": {"microstructure","structure","material"},
            "favor": {"microstructure","structure"},
            "level": "mechanism-family"
        },
        "temporary curved erection support": {
            "recover": {"geometry","structure","access"},
            "favor": {"geometry","structure"},
            "level": "functional-class"
        },
        "near-site precast factory": {
            "recover": {"environment","logistics","schedule"},
            "favor": {"environment","logistics"},
            "level": "functional-class"
        },
        "modularized cladding": {
            "recover": {"geometry","microstructure","logistics"},
            "favor": {"geometry","microstructure"},
            "level": "functional-class"
        },
    }
}

TIERS = {
    "T0_geometry_only": {"geometry"},
    "T1_full_terminal": {"geometry","microstructure","structure","material"},
    "T2_site_access_domain_physics": {
        "geometry","microstructure","structure","material",
        "environment","hydrology","thermal","access"
    },
    "T3_schedule_precision_logistics": {
        "geometry","microstructure","structure","material",
        "environment","hydrology","thermal","access",
        "schedule","precision","logistics"
    }
}

def score_process(spec, evidence):
    if spec["recover"].issubset(evidence):
        return 2
    if spec["favor"].issubset(evidence):
        return 1
    return 0

def evaluate(evidence):
    by_structure = {}
    total = {"recoverable":0,"favored":0,"unknown":0,"score":0,"max_score":0}
    for structure, processes in PROCESSES.items():
        scores = {p:score_process(spec,evidence) for p,spec in processes.items()}
        summary = {
            "recoverable":sum(v==2 for v in scores.values()),
            "favored":sum(v==1 for v in scores.values()),
            "unknown":sum(v==0 for v in scores.values()),
            "score":sum(scores.values()),
            "max_score":2*len(scores),
            "process_scores":scores
        }
        by_structure[structure]=summary
        for k in ("recoverable","favored","unknown","score","max_score"):
            total[k]+=summary[k]
    total["normalized_percent"]=100*total["score"]/total["max_score"]
    return by_structure,total

def leave_one_out():
    full=TIERS["T3_schedule_precision_logistics"]
    _,base=evaluate(full)
    rows=[]
    for modality in sorted(full):
        _,res=evaluate(full-{modality})
        rows.append({
            "removed":modality,
            "recoverable":res["recoverable"],
            "favored":res["favored"],
            "unknown":res["unknown"],
            "normalized_percent":res["normalized_percent"],
            "score_drop_points":base["score"]-res["score"]
        })
    return sorted(rows,key=lambda r:r["score_drop_points"], reverse=True)

def monte_carlo(drop_probability, iterations=20000, seed=42):
    rng=random.Random(seed)
    full=sorted(TIERS["T3_schedule_precision_logistics"])
    recoverable=favored=unknown=score=0
    full_recovery=zero_recovery=0
    for _ in range(iterations):
        evidence={m for m in full if rng.random()>drop_probability}
        _,res=evaluate(evidence)
        recoverable+=res["recoverable"]
        favored+=res["favored"]
        unknown+=res["unknown"]
        score+=res["score"]
        full_recovery += (res["recoverable"]==25)
        zero_recovery += (res["recoverable"]==0)
    return {
        "drop_probability":drop_probability,
        "iterations":iterations,
        "mean_recoverable":recoverable/iterations,
        "mean_favored":favored/iterations,
        "mean_unknown":unknown/iterations,
        "mean_normalized_percent":100*(score/iterations)/50,
        "probability_all_25_recoverable":full_recovery/iterations,
        "probability_zero_recoverable":zero_recovery/iterations
    }

if __name__=="__main__":
    result={"tiers":{}, "leave_one_out":leave_one_out(), "monte_carlo":[]}
    for name,evidence in TIERS.items():
        by,total=evaluate(evidence)
        result["tiers"][name]={"evidence":sorted(evidence),"total":total,"by_structure":by}
    for p in (0.05,0.10,0.20,0.25,0.33,0.50):
        result["monte_carlo"].append(monte_carlo(p))
    print(json.dumps(result,indent=2))
