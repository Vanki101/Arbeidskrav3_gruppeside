import React, { useState, useEffect } from 'react';
import { client } from '../sanityClient';
import MemberCard from '../components/MemberCard';
import WorkLog from '../components/WorkLog';
import './Home.css';

// Home-komponenten viser forsiden med oversikt over alle medlemmer
// og den samlede arbeidsloggen for gruppen
function Home() {
  // State for å lagre medlemmer og arbeidslogger
  const [members, setMembers] = useState([]);
  const [allLogs, setAllLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hent data fra Sanity når komponenten lastes
  useEffect(() => {
    // Hent gruppemedlemmer med grunnleggende informasjon
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

    // Hent alle loggføringer fra alle medlemmer
    client
      .fetch(`*[_type == "member"] {
        firstName,
        "logs": logs[] {
          description,
          date,
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

  // Vis laster-indikator mens data hentes
  if (loading) {
    return <div className="loading">Laster innhold...</div>;
  }

  return (
    <div className="home">
      <h1>Gruppemedlemmer</h1>
      {/* Grid med medlemskort */}
      <div className="member-grid">
        {members.length > 0 ? (
          members.map(member => (
            <MemberCard key={member._id} member={member} />
          ))
        ) : (
          <p className="no-members">Ingen gruppemedlemmer funnet. Legg til medlemmer i Sanity Studio.</p>
        )}
      </div>
      
     
      {/* Arbeidslogg for hele gruppen */}
      {allLogs.length > 0 ? (
        <WorkLog logs={allLogs} />
      ) : (
        <p className="no-logs">Ingen loggføringer funnet. Legg til loggføringer for medlemmer i Sanity Studio.</p>
      )}
    </div>
  );
}

export default Home;