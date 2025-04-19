import React from 'react';
import './WorkLog.css';

function WorkLog({ logs, memberName }) {
  // Sorter loggene etter dato (nyeste først)
  const sortedLogs = logs ? [...logs].sort((a, b) => {
    // Bruk date-feltet hvis det finnes, ellers bruk _createdAt
    const dateA = new Date(a.date || a._createdAt);
    const dateB = new Date(b.date || b._createdAt);
    return dateB - dateA;
  }) : [];

  // Funksjon for å formatere datoen
  const formatDate = (log) => {
    const dateString = log.date || log._createdAt;
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

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
            return (
              <tr key={index}>
                <td>{formatDate(log)}</td>
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