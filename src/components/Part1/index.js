import {
  getResource,
  resolvePromises,
  getAllResourceData
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
  const sortedVehicles = vehiclesWithPopulation.sort(
    (a, b) => a.population > b.population
  );

  const topVehicle = await getResource(sortedVehicles[0].vehicle);
  const vehiclePilotsDetails = peopleWithVehicle
    .filter((p) => p.vehicles.includes(topVehicle.url))
    .map((p) => p.name);

  return {
    Name: topVehicle.name,
    planets: vehiclePlanetsPopulationDetails[topVehicle.url],
    pilots: vehiclePilotsDetails
  };
};
