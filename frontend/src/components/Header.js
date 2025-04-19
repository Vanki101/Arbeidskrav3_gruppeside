import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../sanityClient';
import './Header.css';

// Header-komponenten vises øverst på alle sider
// Inneholder logo og navigasjonsmeny
function Header() {
  // State for å lagre medlemmer som skal vises i navigasjonsmenyen
  const [members, setMembers] = useState([]);

  // Hent medlemmer fra Sanity når komponenten lastes
  useEffect(() => {
    // GROQ-spørring for å hente kun fornavnene til medlemmene
    client
      .fetch(`*[_type == "member"] {
        firstName
      }`)
      .then((data) => {
        // Oppdater state med de hentede medlemmene
        setMembers(data);
      })
      .catch(console.error);
  }, []);

  return (
    <header className="header">
      {/* Logo/gruppenavn */}
      <div className="logo">TEAM EDAEVE</div>
      {/* Navigasjonsmeny */}
      <nav>
        {/* Link til forsiden */}
        <Link to="/" className="nav-link">Hjem</Link>
        {/* Dynamisk genererte lenker til medlemsprofiler */}
        {members.map((member, index) => (
          <Link key={index} to={`/${member.firstName}`} className="nav-link">
            {member.firstName}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export default Header;