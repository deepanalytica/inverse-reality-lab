"""IRL-Bench 005 — Sydney Opera House simple production metrics.

The exact sphere radius/diameter is deliberately excluded from scoring until
the benchmark uses a primary geometric dataset, because institutional summaries
are not uniform in how they report that dimension.
"""
tile_chevrons=4228
beds=26
tiles=1056006
shell_segments=2194
sails=10

print("Tile chevrons / bed average:", tile_chevrons/beds)
print("Tiles / chevron average:", tiles/tile_chevrons)
print("Precast shell segments / sail average:", shell_segments/sails)
