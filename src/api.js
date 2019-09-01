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

const getMovieGenres = async () => {
  // console.log(apiKey)
  const data = await api.get(`/genre/movie/list?api_key=${apiKey}`)
                            .then(res => res.data.genres)
  let genre_list = new Map()
  data.forEach( (genre) => {
    genre_list.set(genre.id, genre.name)
  })
  return genre_list
}

export { searchMovies, getMovieGenres };
