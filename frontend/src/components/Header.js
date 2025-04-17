import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../sanityClient';
import './Header.css';

function Header() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    client
      .fetch(`*[_type == "member"] {
        firstName
      }`)
      .then((data) => {
        setMembers(data);
      })
      .catch(console.error);
  }, []);

  return (
    <header className="header">
      <div className="logo">TEAM EDAEVE</div>
      <nav>
        <Link to="/" className="nav-link">Hjem</Link>
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