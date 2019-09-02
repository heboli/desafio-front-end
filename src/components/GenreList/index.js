import React from 'react';

import './style.scss';

export default function GenreList({ genres }) {
  return (
    <div className="genres">
        {genres.map( (genre, index) => <span key={index} className="genre abel">{genre}</span>)}
    </div>
  );
}
