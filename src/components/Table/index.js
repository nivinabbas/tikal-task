import './style.css';

const Table = ({ dataObject }) => {
  return (
    <table className="vehicle">
      <thead>
        <tr>
          <th className="tg-0lax">Fields</th>
          <th className="tg-0lax">Values</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(dataObject).map((key, index) => {
          return (
            <tr key={index}>
              <td className={index % 2 === 0 ? 'tg-dg7a' : 'tg-0lax'}>{key}</td>
              <td className={index % 2 === 0 ? 'tg-dg7a' : 'tg-0lax'}>
                {typeof dataObject[key] === 'string'
                  ? dataObject[key]
                  : JSON.stringify(dataObject[key])}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
