import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import GenreList from '../GenreList/index';
import Popularity from '../Popularity/index';

import './style.scss';

export default function Card({movie, genres}) {
  const { title, poster_path, vote_average, overview, release_date, id } = movie;
  const date = moment(release_date)
  return (
    <div className="card-container">
      <div className="card">
        {!!poster_path && <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt="poster do filme"/> }

        <div className="content">
          <div className="top-bar abel">
            <Popularity value={vote_average * 10} halfDown />
            <Link to={`/movie/${id}`}><h1>{title}</h1></Link>
          </div>

          <span className="date abel">{date.isValid() ? date.format('DD/MM/YYYY') : "--"}</span>
          <div className="info">
            <p className="lato">{overview}</p>
            <GenreList genres={genres}/>
          </div>
        </div>

      </div>
    </div>
  );
}
