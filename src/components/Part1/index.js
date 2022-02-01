import {
  getResource,
  resolvePromises,
  getAllResourceData,
} from '../../helpers/api';

export const getVehicleWithHighestPopulation = async () => {
  const people = await getAllResourceData('people', 10);
  const planetsResources = [];
  const vehiclesPlanetsMap = {};

  const peopleWithVehicle = people.filter((p) => p.vehicles.length);

  peopleWithVehicle.map((p) => {
    const home = p.homeworld;
    p.vehicles.map((v) => {
      if (!vehiclesPlanetsMap[v]) vehiclesPlanetsMap[v] = [];
      vehiclesPlanetsMap[v].push(home);
      return v;
    });
    planetsResources.push(home);
    return p;
  });

  const planetsPromises = [...new Set(planetsResources)].map((planet) =>
    getResource(planet)
  );

  const planets = await resolvePromises(planetsPromises);

  const vehiclePlanetsPopulationDetails = {};

  const vehiclesWithPopulation = Object.keys(vehiclesPlanetsMap).map(
    (vehicleKey) => {
      const vehiclePlanets = vehiclesPlanetsMap[vehicleKey];

      const population = vehiclePlanets.reduce((total, planet) => {
        const { population = 0, name } = planets.find((p) => p.url === planet);

        if (!vehiclePlanetsPopulationDetails[vehicleKey])
          vehiclePlanetsPopulationDetails[vehicleKey] = [];
        vehiclePlanetsPopulationDetails[vehicleKey].push({ population, name });

        return (total += Number(population) || 0);
      }, 0);
      return { vehicle: vehicleKey, population };
    }
  );

  const sortedVehicles = vehiclesWithPopulation
    .sort((a, b) => b.population - a.population)
    .filter((a) => a.population > 0);

  const topVehicles = await resolvePromises(
    sortedVehicles.map((v) => getResource(v.vehicle)),
    true
  );

  const top = topVehicles.map(({ name, url }) => {
    return {
      name,
      pilots: peopleWithVehicle
        .filter((p) => p.vehicles.includes(url))
        .map((p) => p.name),
      planets: vehiclePlanetsPopulationDetails[url],
    };
  });

  return top;
};
