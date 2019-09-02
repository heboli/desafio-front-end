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
    <article className="card">
      {!!poster_path && <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt="poster do filme"/> }

      <div className="content">
        <header className="top-bar-container abel">
          <div className="top-bar-bg" />
          <Popularity value={vote_average * 10} halfDown />
          <h1><Link to={`/movie/${id}`}>{title}</Link></h1>
          <p className="date abel">{date.isValid() ? date.format('DD/MM/YYYY') : "--"}</p>
        </header>

        <section className="info">
          <p className="lato">{overview}</p>
          <GenreList genres={genres}/>
        </section>
      </div>

    </article>
  );
}
