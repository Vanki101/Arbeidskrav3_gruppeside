import React from 'react';
import { Link } from 'react-router-dom';
import { urlFor } from '../sanityClient';
import './MemberCard.css';

// MemberCard-komponenten viser et kort med medlemsinformasjon på forsiden
// Fungerer som en lenke til medlemmets profilside
function MemberCard({ member }) { 
  return ( 
    // Link-komponenten gjør kortet klikkbart og navigerer til medlemsprofilen
    <Link to={`/${member.firstName}`} className="member-card">
      {/* Viser medlemsbilde hvis det finnes, ellers viser en placeholder */}
      {member.image ? (
        <img 
          src={urlFor(member.image).width(200).url()} 
          alt={`${member.firstName} ${member.lastName}`} 
          className="member-image"
        />
      ) : (
        <div className="member-image-placeholder">bilde</div>
      )}
      {/* Medlemsnavn (fornavn og etternavn) */}
      <h3 className="member-name">{member.firstName} {member.lastName}</h3>
      {/* Medlemmets e-postadresse */}
      <p className="member-email">{member.email}</p>
    </Link>
  );
}

export default MemberCard;