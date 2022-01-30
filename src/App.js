import './App.css';
import { useEffect, useState } from 'react';
import { getVehicleWithHighestPopulation } from './components/Part1/index';
import { normalizedChartData } from './helpers/chart';
import loader from './assets/images/loader.svg';
import BarChart from './components/BarChart/BarChart';
import Table from './components/Table';
import { setCache, getDataFromCache, clearCache } from './helpers/cache';

const planetsNames = ['Tatooine', 'Alderaan', 'Naboo', 'Bespin', 'Endor'];

function App() {
  const [vehicle, setVehicle] = useState({});
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAPIData = async () => {
    const topVehicle = await getVehicleWithHighestPopulation();
    setVehicle(topVehicle);

    const planetsChartData = await normalizedChartData('planets', planetsNames);
    setChartData(planetsChartData);
    const cacheData = { topVehicle, planetsChartData };
    setCache(cacheData);
    setLoading(false);
  };

  useEffect(() => {
    const cacheData = getDataFromCache();
    if (cacheData) {
      const { planetsChartData, topVehicle } = cacheData;
      setChartData(planetsChartData);
      setVehicle(topVehicle);
      setLoading(false);
    } else getAPIData();

    return () => {};
  }, []);

  const getNewData = () => {
    setLoading(true);
    clearCache();
    getAPIData();
  };

  return (
    <div className="app-container">
      {loading ? (
        <img src={loader} alt="loader" />
      ) : (
        <div>
          <button className="button-data" onClick={getNewData}>
            Get New Data
          </button>
          <div className="content">
            <Table dataObject={vehicle} />
          </div>
          <BarChart data={chartData} />
        </div>
      )}
    </div>
  );
}

export default App;
