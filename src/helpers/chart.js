import { resolvePromises, baseURL, getResource } from './api';

const getPlanetsChartData = (planets = []) => {
  const totalPopulation = planets.reduce((total, { population }) => {
    return (total += Number(population) || 0);
  }, 0);
  return planets.map(({ population, name }) => {
    let planetPercentage = ((Number(population) || 0) / totalPopulation) * 100;

    return { name, percentage: planetPercentage, population };
  });
};

export const normalizedChartData = async (resource, names) => {
  const resourcePromises = names.map((name) => {
    return getResource(`${baseURL}/${resource}/?search=${name}`);
  });

  const results = await resolvePromises(resourcePromises, false, true);
  return getPlanetsChartData(results);
};
