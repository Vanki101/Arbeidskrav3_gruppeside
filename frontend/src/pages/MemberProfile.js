import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, urlFor } from '../sanityClient';
import './MemberProfile.css';

// MemberProfile-komponenten viser detaljert informasjon om et enkelt medlem
// inkludert bilde, biografi, interesser og personlig arbeidslogg
function MemberProfile() {
  // Hent firstName fra URL-parameteren
  const { firstName } = useParams();
  // State for å lagre medlemsdata og laste-status
  const [memberData, setMemberData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hent medlemsdata fra Sanity når komponenten lastes eller URL endres
  useEffect(() => {
    client
      .fetch(
        // GROQ-spørring for å hente detaljert informasjon om medlemmet
        `*[_type == "member" && firstName == $firstName][0] {
          firstName,
          lastName,
          email,
          image,
          biography,
          interests,
          "logs": logs[] {
            description,
            date,
            hours,
            _createdAt
          }
        }`,
        { firstName }
      )
      .then((data) => {
        setMemberData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [firstName]);

  // Vis laster-indikator mens data hentes
  if (loading) {
    return <div className="loading">Laster...</div>;
  }

  // Vis feilmelding hvis medlemmet ikke finnes
  if (!memberData) {
    return <div className="not-found">Fant ikke medlemmet</div>;
  }

  // Formater dato for loggføringer
  const formatDate = (log) => {
    // Bruk date-feltet hvis det finnes, ellers bruk _createdAt
    const dateString = log.date || log._createdAt;
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  return (
    <div className="member-profile">
      <div className="profile-container">
        {/* Profilheader med bilde og grunnleggende info */}
        <div className="profile-header">
          <div className="profile-image-container">
            {memberData.image ? (
              <img 
                src={urlFor(memberData.image).width(300).url()} 
                alt={`${memberData.firstName} ${memberData.lastName}`} 
                className="profile-image"
              />
            ) : (
              <div className="profile-image-placeholder">bilde</div>
            )}
          </div>
          
          <div className="profile-info">
            <h1>{memberData.firstName} {memberData.lastName}</h1>
            <p className="profile-email">{memberData.email}</p>
          </div>
        </div>
        
        {/* Biografi-seksjon (vises kun hvis den finnes) */}
        {memberData.biography && (
          <div className="profile-section">
            <h2>Biografi</h2>
            <p>{memberData.biography}</p>
          </div>
        )}
        
        {/* Interesser-seksjon (vises kun hvis det finnes interesser) */}
        {memberData.interests && memberData.interests.length > 0 && (
          <div className="profile-section">
            <h2>Interesser</h2>
            <ul className="interests-list">
              {memberData.interests.map((interest, index) => (
                <li key={index}>{interest}</li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Loggføringer-seksjon */}
        <div className="profile-section">
          <h2>{memberData.firstName}s loggføringer</h2>
          {memberData.logs && memberData.logs.length > 0 ? (
            <div className="log-table-container">
              <table className="log-table">
                <thead>
                  <tr>
                    <th>Dato</th>
                    <th>Oppgave</th>
                    <th>Timer</th>
                  </tr>
                </thead>
                <tbody>
                  {memberData.logs.map((log, index) => (
                    <tr key={index}>
                      <td>{formatDate(log)}</td>
                      <td>{log.description}</td>
                      <td>{log.hours} timer</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>Ingen loggføringer for dette medlemmet.</p>
          )}
        </div>
        
        {/* Lenke tilbake til forsiden */}
        <div className="back-section">
          <Link to="/" className="back-link">Tilbake til forsiden</Link>
        </div>
      </div>
    </div>
  );
}

export default MemberProfile;