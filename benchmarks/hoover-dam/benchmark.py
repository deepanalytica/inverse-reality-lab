"""IRL-Bench 003 — Hoover Dam numerical sanity checks."""
G=9.80665
YD3_TO_M3=0.764554857984
rho=2400.0
alpha=8.5e-7

L=60.0
thermal_years=L**2/alpha/(365.25*24*3600)

bucket_yd3=8
bucket_m3=bucket_yd3*YD3_TO_M3
bucket_mass=bucket_m3*rho
bucket_weight=bucket_mass*G

peak_yd3_day=10462
bucket_trips=peak_yd3_day/bucket_yd3
cableways=5
trips_per_cableway_hour=bucket_trips/cableways/24
mean_cycle_minutes=60/trips_per_cableway_hour

print("Thermal diffusion scale [years]:", thermal_years)
print("8 yd3 bucket volume [m3]:", bucket_m3)
print("8 yd3 bucket concrete mass [t]:", bucket_mass/1000)
print("Bucket weight [kN]:", bucket_weight/1000)
print("Peak bucket trips/day:", bucket_trips)
print("Trips/cableway/hour if evenly shared:", trips_per_cableway_hour)
print("Mean cycle scale [min]:", mean_cycle_minutes)
