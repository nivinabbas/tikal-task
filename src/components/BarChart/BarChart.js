import './style.css';

const BarChart = ({ data }) => {
  return (
    <div className="container">
      <div className="mainContainer">
        {data.map(({ percentage, population, name }, i) => {
          return (
            <div className="barChartContainer" key={i}>
              <span className="text">{population}</span>
              <div className="makeBar" style={{ height: `${percentage}%` }} />
              <div className="text">{name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default BarChart;
