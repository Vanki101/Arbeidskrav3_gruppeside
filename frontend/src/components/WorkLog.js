import React from 'react';
import './WorkLog.css';

function WorkLog({ logs, memberName }) {
  // Sorter loggene etter _createdAt (nyeste først)
  const sortedLogs = logs ? [...logs].sort((a, b) => {
    return new Date(b._createdAt) - new Date(a._createdAt);
  }) : [];

  return (
    <div className="work-log">
      <h2>{memberName ? `${memberName}s loggføringer` : 'Arbeidslogg'}</h2>
      <table className="log-table">
        <thead>
          <tr>
            <th>Dato</th>
            {!memberName && <th>Navn</th>}
            <th>Oppgave</th>
            <th>Timer</th>
          </tr>
        </thead>
        <tbody>
          {sortedLogs.map((log, index) => {
            // Formater dato fra _createdAt
            const date = new Date(log._createdAt);
            const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
            
            return (
              <tr key={index}>
                <td>{formattedDate}</td>
                {!memberName && <td>{log.memberName}</td>}
                <td>{log.description}</td>
                <td>{log.hours} timer</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default WorkLog;