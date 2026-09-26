"""IRL-Bench 004 — Empire State Building coarse pipeline calculations."""
from math import factorial, comb

steel_t=57480.0
structural_floors=85
avg_steel_t_per_floor=steel_t/structural_floors

unconstrained=factorial(11)
catalan5=comb(10,5)//6
reduction=100*(1-catalan5/unconstrained)

print("Average steel / structural floor [t]:", avg_steel_t_per_floor)
print("Unconstrained 11-event orders:", unconstrained)
print("Valid two-chain pipeline interleavings:", catalan5)
print("Search-space reduction [%]:", reduction)
print("Theoretical max-capacity picks/floor @20t:", avg_steel_t_per_floor/20)
print("Theoretical max-capacity picks/floor @30t:", avg_steel_t_per_floor/30)
