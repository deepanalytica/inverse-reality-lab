"""IRL-Bench 002: Torre Eiffel — coarse reproducibility calculations."""
from math import factorial

G = 9.80665

# 15-node coarse poset:
# F1..F4 -> L1..L4 -> B1 -> U1..U4 -> B2 -> S
#
# Before B1: four independent two-element chains (Fi < Li)
# Number of linear extensions = 8! / 2^4
# Then B1; then 4 upper branches in any order; then B2; then S.

N = 15
unconstrained = factorial(N)
pre_B1 = factorial(8) // (2**4)
upper = factorial(4)
admissible = pre_B1 * upper
reduction = 100 * (1 - admissible/unconstrained)

metal_mass_kg = 7_300_000
pieces = 18_038
rivets = 2_500_000

avg_piece_mass = metal_mass_kg / pieces
avg_piece_weight = avg_piece_mass * G
total_weight = metal_mass_kg * G

crane_capacity_kg = 3_000
crane_static_force = crane_capacity_kg * G
capacity_to_avg_piece = crane_capacity_kg / avg_piece_mass

site_rivets = rivets / 3
factory_rivets = 2 * rivets / 3
avg_rivets_per_piece = rivets / pieces

print("Unconstrained serial orders:", unconstrained)
print("Admissible linear extensions:", admissible)
print("Search-space reduction [%]:", reduction)
print()
print("Metal mass [kg]:", metal_mass_kg)
print("Total metal weight [MN]:", total_weight/1e6)
print("Average terminal mass per iron piece [kg]:", avg_piece_mass)
print("Average terminal piece weight [kN]:", avg_piece_weight/1e3)
print("3-ton crane static scale [kN]:", crane_static_force/1e3)
print("Crane capacity / average piece mass:", capacity_to_avg_piece)
print("Approx. factory rivets:", factory_rivets)
print("Approx. site rivets:", site_rivets)
print("Global average rivets / iron piece:", avg_rivets_per_piece)
