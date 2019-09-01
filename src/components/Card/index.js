import React from 'react';
import moment from 'moment';

import './style.scss';

export default function Card({movie, genres}) {
  // console.log(el)
  const {title, poster_path, popularity, overview, release_date} = movie;
  // console.log(children)
  return (
    <div className="card-container">
      <div className="card">
        {!!poster_path && <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt="poster do filme"/> }
        <div className="content">
          <div className="top-bar abel">
            <div className="popularity">
              <div className="popularity">
                <span>{Math.round(popularity)}%</span>
              </div>
            </div>
            <h1>{title}</h1>
          </div>
          <span className="date abel">{ moment(release_date).format('DD/MM/YYYY')}</span>
          <p className="lato">{overview}</p>
          <div className="genres">
            {genres.map( (genre, index) => <span key={index} className="genre abel">{genre}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}
