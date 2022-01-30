export const getDataFromCache = () => {
  const data = localStorage.getItem('tikalTask');
  if (data) {
    try {
      const parsedJson = JSON.parse(data);
      return parsedJson;
    } catch {
      return null;
    }
  }
  return;
};

export const setCache = (data) => {
  localStorage.setItem('tikalTask', JSON.stringify(data));
};

export const clearCache = () => {
  localStorage.removeItem('tikaTask');
};
