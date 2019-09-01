// import React from 'react';
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
  });

const apiKey = process.env.API_KEY
const elementsByPage = process.env.ELEMENTS_BY_PAGE

const searchMovies = async (query, page) => {
  if(query === ''){
    return {results: [], page: 0, total_pages: 1, original_page: 1}
  }
  let data = await api.get(`/search/movie?api_key=${apiKey}&query=${query}&page=${page}`)
      .then( res => {
      //  console.log("res:", res)
        const { results, total_results, page: original_page } = res.data
        let total_pages = Math.ceil(total_results / 5) 
      //  this.setState({results, total_pages})
      return {results, total_pages, original_page}
    })
  console.log("get",data)
  return data
}

export default searchMovies;
