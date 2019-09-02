// import React from 'react';
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
  });

const apiKey = process.env.REACT_APP_API_KEY

const searchMovies = async (query, page) => {
  if(query === ''){
    return {results: [], page: 0, total_pages: 1, original_page: 1}
  }
  const data = await api.get(`/search/movie?api_key=${apiKey}&query=${query}&page=${page}`)
                        .then( (res) => {
                            const { results, total_results, page: original_page } = res.data
                            let total_pages = Math.ceil(total_results / 5) 
                            return {results, total_pages, original_page}
                        })
  // console.log("get",data)
  return data
}


const getMovieVideos = async (id) => {
  let videos = await api.get(`/movie/${id}/videos?api_key=${apiKey}`)
                          .then( (res) => res.data.results)
  videos = videos.filter( (video) => video.site === "YouTube" )
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
                        .catch( (res) => {return { error: true }} )
  // console.log("get",data)
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
          genres,
          popularity,
          poster_path,
          error
        }
}

const getMoviesGenres = async () => {
  // console.log(apiKey)
  const data = await api.get(`/genre/movie/list?api_key=${apiKey}`)
                            .then(res => res.data.genres)
  let genre_list = new Map()
  data.forEach( (genre) => {
    genre_list.set(genre.id, genre.name)
  })
  return genre_list
}

export { searchMovies, getMovieVideos, getMovie, getMoviesGenres };
