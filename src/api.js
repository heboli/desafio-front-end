// import React from 'react';
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
  });

const apiKey = process.env.REACT_APP_API_KEY

const searchMovies = async (query, page) => {
  if(query === ''){
    return { results: [], page: 0, total_pages: 1, original_page: 1 }
  }
  const data = await api.get(`/search/movie?api_key=${apiKey}&query=${query}&page=${page}`)
                        .then( (res) => {
                            let { results, total_results, page: original_page } = res.data
                            results = results.map( ({ title, poster_path, vote_average, overview, release_date, id, genre_ids }) => 
                               ({ title, poster_path, vote_average, overview, release_date, id, genre_ids })
                            )
                            let total_pages = Math.ceil(total_results / 5) 
                            return { results, total_pages, original_page }
                        })
  return data
}


const getMovieVideos = async (id) => {
  let videos = await api.get(`/movie/${id}/videos?api_key=${apiKey}`)
                        .then( (res) => res.data.results )
  videos = videos.filter( (video) => video.site === "YouTube" )
                 .slice(0,1)
                 .map( (video) => ({ key: video.key, title: video.name }) )
  return videos
}

const getMovie = async (id) => {
  const { title,
          release_date,
          overview, 
          status,
          original_language,
          runtime,
          budget,
          revenue,
          genres,
          popularity,
          poster_path,
          error
  } = await api.get(`/movie/${id}?api_key=${apiKey}`)
               .then( (res) => res.data)
               .catch( () => ({ error: true }) )
  
  const allowedStatus = {
    'Rumored': 'Rumores',
    'Planned': 'Planejado',
    'In Production': 'Em produção',
    'Post Production': 'Pós-Produção',
    'Released': 'Lançado',
    'Canceled': 'Cancelado'
  }

  return{ title,
          release_date,
          overview, 
          status: allowedStatus[status],
          original_language,
          runtime,
          budget,
          revenue,
          profit: revenue - budget,
          genres: !error ? genres.map( (genre) => genre.name ) : [],
          popularity,
          poster_path,
          error
  }
}

const getMoviesGenres = async () => {
  const data = await api.get(`/genre/movie/list?api_key=${apiKey}`)
                        .then(res => res.data.genres)
  let genre_list = new Map()
  data.forEach( (genre) => genre_list.set(genre.id, genre.name) )
  return genre_list
}

export { searchMovies, getMovieVideos, getMovie, getMoviesGenres };
