import React from 'react';

import './style.scss';

export default function GenreList({ genres }) {
  // genres = genres.map()
  return (
    <div className="genres">
        {genres.map( (genre, index) => <span key={index} className="genre abel">{genre}</span>)}
    </div>
  );
}
