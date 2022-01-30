export const baseURL = 'https://swapi.dev/api';

export const getResource = async (resource) => {
  const response = await fetch(resource);
  const data = await response.json();
  return data;
};

export const resolvePromises = async (
  resourcePromises,
  single = true,
  firstMatch = false
) => {
  const result = await Promise.all(resourcePromises);
  if (single) {
    return result;
  }
  const normalizedResults = result.map((r) =>
    firstMatch ? r.results[0] : r.results
  );
  const final = normalizedResults.flat();
  return final;
};

export const getAllResourceData = async (resource, pageLimit) => {
  const { count, results } = await getResource(`${baseURL}/${resource}`);
  const pages = Math.ceil(count / pageLimit);
  const resourcePromises = [];
  for (let i = 2; i <= pages; i++) {
    resourcePromises.push(getResource(`${baseURL}/${resource}/?page=${i}`));
  }
  const all = await resolvePromises(resourcePromises, false);
  return [...results, ...all];
};
