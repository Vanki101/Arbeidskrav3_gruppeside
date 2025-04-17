import React from 'react';
import { Link } from 'react-router-dom';
import { urlFor } from '../sanityClient';
import './MemberCard.css';

function MemberCard({ member }) {
  return (
    <Link to={`/${member.firstName}`} className="member-card">
      {member.image ? (
        <img 
          src={urlFor(member.image).width(200).url()} 
          alt={`${member.firstName} ${member.lastName}`} 
          className="member-image"
        />
      ) : (
        <div className="member-image-placeholder">bilde</div>
      )}
      <h3 className="member-name">{member.firstName} {member.lastName}</h3>
      <p className="member-email">{member.email}</p>
    </Link>
  );
}

export default MemberCard;