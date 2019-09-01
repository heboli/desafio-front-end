import React from 'react';

import './style.scss';

export default function Card({movie}) {
  // console.log(el)
  const {title, poster_path, popularity, overview} = movie;
  return (
    <div className="card">
      {!!poster_path && <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt="poster do filme"/> }
      {title}
      {popularity}
      {overview}
    </div>
  );
}
