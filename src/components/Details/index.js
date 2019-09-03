import React, { Component } from 'react';
import { getMovie, getMovieVideos } from '../../api';
import moment from 'moment';
import ISO6391 from 'iso-639-1';
import Illustration from '../Illustration';
import GenreList from '../GenreList';
import Popularity from '../Popularity';
import numeral from 'numeral';

import './style.scss';

export default class Details extends Component {
  state = { 
    title: '',
    release_date: '',
    overview: '',
    status: '',
    original_language: '',
    runtime: 0,
    budget: 0,
    revenue: 0,
    profit: 0,
    genres: [],
    vote_average: 0,
    poster_path: '',
    error: false,
    loading: true,
    videos: []
  }

  updateVideos = async () => {
    const videos = await getMovieVideos(this.props.match.params.id)
    this.setState({videos})
  }

  componentDidMount = async () => {
    const data = await getMovie(this.props.match.params.id)
    this.updateVideos()
    this.setState({ ...data, loading: false })                  
  }
  
  render() {
    const duration = this.state.runtime > 0 ? moment.duration(this.state.runtime, 'minutes') : null
    const items = {
      'situação': this.state.status,
      'idioma': ISO6391.getName(this.state.original_language),
      'duração': !!duration ? `${duration.hours()}h ${duration.minutes()}min` : '--',
      'orçamento': numeral(this.state.budget).format('$0,0.00'),
      'receita': numeral(this.state.revenue).format('$0,0.00'),
      'lucro': numeral(this.state.profit).format('$0,0.00')
    }

    const date = moment(this.state.release_date)
    const illustration = this.state.error ? 'err404' : this.state.loading ? 'loading' : null

    return (
      <>
      {!!illustration ? 
        <Illustration content={illustration} />
        :
        <div className="details-container">
          <div className="details">
            <div className="top-bar">
              <h1 className="abel">{this.state.title}</h1>
              <span className="date lato">{date.isValid() ? date.format('DD/MM/YYYY') : "--"}</span>
            </div>
            <div className="content">
              {!!this.state.poster_path && 
                <img src={`https://image.tmdb.org/t/p/w500${this.state.poster_path}`} alt="movie poster"/> 
              }
              <div className="desc">
                <section>
                  <h3 className="abel">Sinopse</h3>
                  <hr />
                  <p className="lato">{this.state.overview}</p>
                </section>
                <section>
                  <h3 className="abel">Informações</h3>
                  <hr />
                  <div className="info">
                    {Object.keys(items).map( (key) => 
                                <section key={key}>
                                  <h5 className="abel">{key}</h5>
                                  <p className="lato">{items[key]}</p>
                                </section>
                    )}
                  </div>
                </section>
                <div className="badges">
                  <GenreList genres={this.state.genres} />
                  <Popularity value={this.state.vote_average * 10} bigger />
                </div>
              </div>

            </div>
            {this.state.videos.map( (video) => 
                                <div className="video" key={video.key}>
                                  <iframe 
                                    src={`https://www.youtube.com/embed/${video.key}`}
                                    frameBorder="0"
                                    title={video.title}
                                  />
                                </div>
            )}
          </div>
        </div>
      }
      </>
    );
  }
}
