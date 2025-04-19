import React, { useState, useEffect } from 'react';
import { client } from '../sanityClient';
import MemberCard from '../components/MemberCard';
import WorkLog from '../components/WorkLog';
import './Home.css';

function Home() {
  const [members, setMembers] = useState([]);
  const [allLogs, setAllLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hent gruppemedlemmer
    client
      .fetch(`*[_type == "member"] {
        _id,
        firstName,
        lastName,
        email,
        image
      }`)
      .then((data) => {
        setMembers(data);
      })
      .catch(error => {
        console.error("Feil ved henting av medlemmer:", error);
      });

    // Hent alle loggføringer
    client
      .fetch(`*[_type == "member"] {
        firstName,
        "logs": logs[] {
          description,
          hours,
          _createdAt
        }
      }`)
      .then((data) => {
        // Kombiner alle loggene fra alle medlemmer
        const logs = [];
        data.forEach(member => {
          if (member.logs) {
            member.logs.forEach(log => {
              logs.push({
                ...log,
                memberName: member.firstName
              });
            });
          }
        });
        
        setAllLogs(logs);
        setLoading(false);
      })
      .catch(error => {
        console.error("Feil ved henting av logger:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Laster innhold...</div>;
  }

  return (
    <div className="home">
      <h1>Gruppemedlemmer</h1>
      <div className="member-grid">
        {members.length > 0 ? (
          members.map(member => (
            <MemberCard key={member._id} member={member} />
          ))
        ) : (
          <p className="no-members">Ingen gruppemedlemmer funnet. Legg til medlemmer i Sanity Studio.</p>
        )}
      </div>
      
      <h2>Arbeidslogg</h2>
      {allLogs.length > 0 ? (
        <WorkLog logs={allLogs} />
      ) : (
        <p className="no-logs">Ingen loggføringer funnet. Legg til loggføringer for medlemmer i Sanity Studio.</p>
      )}
    </div>
  );
}

export default Home;