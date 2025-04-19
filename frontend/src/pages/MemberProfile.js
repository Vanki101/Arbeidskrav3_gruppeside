import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, urlFor } from '../sanityClient';
import './MemberProfile.css';

function MemberProfile() {
  const { firstName } = useParams();
  const [memberData, setMemberData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "member" && firstName == $firstName][0] {
          firstName,
          lastName,
          email,
          image,
          biography,
          interests,
          "logs": logs[] {
            description,
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

  if (loading) {
    return <div className="loading">Laster...</div>;
  }

  if (!memberData) {
    return <div className="not-found">Fant ikke medlemmet</div>;
  }

  // Formater dato for loggføringer
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  return (
    <div className="member-profile">
      <div className="profile-container">
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
        
        {memberData.biography && (
          <div className="profile-section">
            <h2>Biografi</h2>
            <p>{memberData.biography}</p>
          </div>
        )}
        
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
                      <td>{formatDate(log._createdAt)}</td>
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
        
        <div className="back-section">
          <Link to="/" className="back-link">Tilbake til forsiden</Link>
        </div>
      </div>
    </div>
  );
}

export default MemberProfile;