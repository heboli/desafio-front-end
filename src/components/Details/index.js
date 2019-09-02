import React, { Component } from 'react';
import { getMovie, getMovieVideos } from '../../api';
import moment from 'moment';
import ISO6391 from 'iso-639-1';
import Illustration from '../Illustration';

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
    popularity: 0,
    poster_path: '',
    error: false,
    videos: []
  }

  updateVideos = async () => {
    const videos = await getMovieVideos(this.props.match.params.id)
    this.setState({videos})
  }

  componentDidMount = async () => {
    const data = await getMovie(this.props.match.params.id)
    this.updateVideos()
    this.setState({ ...data })                  
  }
  
  render() {
    console.log(this.state)
    const items = {
      'situação': this.state.status,
      'idioma': ISO6391.getName(this.state.original_language),
      'duração': `${Math.floor(this.state.runtime/60)}h ${this.state.runtime%60}min`,
      'orçamento': this.state.budget,
      'receita': this.state.revenue,
      'lucro': this.state.profit
    }

    return (
      <>
      { !this.state.error ?
        <div className="details-container">
          <div className="details">
            <div className="top-bar">
              <h1 className="abel">{this.state.title}</h1>
              <span className="date lato">{moment(this.state.release_date).format('DD/MM/YYYY')}</span>
            </div>
            <div className="content">
            {!!this.state.poster_path && <img src={`https://image.tmdb.org/t/p/w500${this.state.poster_path}`} alt="movie poster"/> }
            <div className="desc">
              <h3 className="abel">Sinopse</h3>
              <hr />
              <p className="lato">{this.state.overview}</p>

              <h3 className="abel">Informações</h3>
              <hr />
              <div className="info">
                {Object.keys(items).map( (key) => 
                            <div key={key}>
                              <h5 className="abel">{key}</h5>
                              <p className="lato">{items[key]}</p>
                            </div>
                )}
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
        :
        <Illustration content="err404" />
      }
      </>
    );
  }
}
