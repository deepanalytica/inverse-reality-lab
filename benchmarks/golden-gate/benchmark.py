"""IRL-Bench 001: Golden Gate Bridge coarse reproducibility script."""
from itertools import permutations
from math import factorial, hypot

G = 9.80665

# Core terminal ontology
nodes = ["P","A","T","M","S","D","R"]
edges = [
    ("P","T"),
    ("A","M"),
    ("T","M"),
    ("M","S"),
    ("S","D"),
    ("D","R"),
]

def valid(order, edges):
    pos = {x:i for i,x in enumerate(order)}
    return all(pos[a] < pos[b] for a,b in edges)

orders = [o for o in permutations(nodes) if valid(o, edges)]

print("Unconstrained orders:", factorial(len(nodes)))
print("Admissible linear extensions:", len(orders))
print("Reduction %:", 100*(1-len(orders)/factorial(len(nodes))))
for o in orders:
    print(" -> ".join(o))

# Coarse force/energy scales
tower_mass = 40_200_000 / 2
tower_height = 227
tower_weight = tower_mass * G
tower_energy = tower_mass * G * (tower_height/2)

cable_mass = 12_000 * 907.18474  # US tons to kg
cable_weight = cable_mass * G
wire_count = 27_572
wire_mass = cable_mass / wire_count

deck_load = 330_000  # N/m, simplified educational model
bay = 15.24
bay_weight = deck_load * bay
bay_mass = bay_weight / G

print("\nForce / energy scales")
print("Tower mass each [kg]:", tower_mass)
print("Tower weight [MN]:", tower_weight/1e6)
print("Tower ideal gravitational potential [GJ]:", tower_energy/1e9)
print("Cable mass each [kg]:", cable_mass)
print("Cable weight [MN]:", cable_weight/1e6)
print("Average wire mass scale [kg]:", wire_mass)
print("50-ft deck bay weight [MN]:", bay_weight/1e6)
print("50-ft deck equivalent mass [t]:", bay_mass/1000)

# Optional simple main-span cable-force scale
L = 1280
sag = 144
w_per_cable = deck_load/2
H = w_per_cable * L**2 / (8*sag)
V = w_per_cable * L/2
T = hypot(H,V)
print("Simplified main-span horizontal tension per cable [MN]:", H/1e6)
print("Simplified tower-end tension per cable [MN]:", T/1e6)
