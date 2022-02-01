import { useState } from 'react';
import './style.css';

const Table = ({ data = [], pageSize = 2 }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const pages = Math.ceil(data.length / pageSize);
  return (
    <div>
      <table className="vehicle">
        <thead>
          <tr>
            <th className="tg-0lax">Name</th>
            <th className="tg-0lax">Planets</th>
            <th className="tg-0lax">pilots</th>
          </tr>
        </thead>
        <tbody width="100%">
          {data
            .slice(currentPage * pageSize, currentPage * pageSize + pageSize)
            .map(({ name, planets, pilots }, index) => {
              return (
                <tr key={Math.random()}>
                  <td className={index % 2 === 0 ? 'tg-dg7a' : 'tg-0lax'}>
                    {name}
                  </td>
                  <td className={index % 2 === 0 ? 'tg-dg7a' : 'tg-0lax'}>
                    {JSON.stringify(planets)}
                  </td>
                  <td className={index % 2 === 0 ? 'tg-dg7a' : 'tg-0lax'}>
                    {JSON.stringify(pilots)}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className="pagination-buttons">
        {Array(pages)
          .fill(0)
          .map((page, index) => {
            return (
              <button
                onClick={() => setCurrentPage(index)}
                className="page-button"
              >
                {index + 1}
              </button>
            );
          })}
      </div>
    </div>
  );
};

export default Table;
