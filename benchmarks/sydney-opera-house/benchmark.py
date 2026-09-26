"""IRL-Bench 005 — Sydney Opera House simple production metrics."""
import math

sphere_diameter_m=75.0
R=sphere_diameter_m/2
gaussian_curvature=1/(R*R)

tile_chevrons=4228
beds=26
tiles=1056006
shell_segments=2194
sails=10

print("Sphere radius from Arup 75m diameter [m]:", R)
print("Gaussian curvature [1/m2]:", gaussian_curvature)
print("Tile chevrons / bed average:", tile_chevrons/beds)
print("Tiles / chevron average:", tiles/tile_chevrons)
print("Precast shell segments / sail average:", shell_segments/sails)
