import React, { Component } from 'react';

import Header from './components/Header/index';
import SearchBox from './components/SearchBox/index';
import Card from './components/Card/index';
import Pagination from './components/Pagination/index';
import { searchMovies, getMovieGenres } from './api';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends Component{

  state = {
    results: [],
    page: 1,
    original_page: 1,
    total_pages: 1,
    genre_list: new Map(),
    query: ''
  }

  elementsByPage = parseInt(process.env.REACT_APP_ELEMENTS_BY_PAGE)


  componentDidMount = async () => {
    this.updateMovies({ query: "Thor" })
    const genre_list = await getMovieGenres()
    this.setState({ genre_list })
  }

  updateMovies = async ({ original_page = this.state.original_page, query = this.state.query, page = this.state.page }) => {
    // let { page } = this.state
    if(query !== this.state.query){
      // console.log("epa")
      page = original_page = 1
    }
    const data = await searchMovies(query, original_page)
    const { results, total_pages } = data;
    ( { original_page } = data )
    this.setState({ results, total_pages, page, query, original_page })
  } 

  // changeQuery = async (query) => {      
  //   const {results, total_pages, original_page} = await searchMovies(query, 1)
  //   // console.log("set:", results, total_pages)
  //   this.setState({results, total_pages, query, original_page})
  // }

  changePage = (page) => {
    const original_page = Math.floor((page - 1)/4) + 1 //9/5
    // console.log('original:', original_page)
    if(original_page !== this.state.original_page){
      console.log("Updating...")
      this.updateMovies({ original_page, page })
    }
    this.setState({page})
  }

  render() {
    
    console.log("page",this.state.page)
    // const index = 
    const { page, total_pages, genre_list } = this.state
    const start = ((page - 1) * this.elementsByPage) % 20
    const end = start + this.elementsByPage

    const movies = this.state.results.slice(start, end)
    // console.log("movies",movies, start, end)
    // console.log("s e", start, end)
    // const pages = this.generatePagesRange(page, total_pages)
    
    return (
      <>
        <Header />
        <SearchBox handle={(query) => this.updateMovies({ query })}/>
        <main>
          {movies.map((movie, index) => <Card movie={movie} key={index} genres={movie.genre_ids.map((id) => genre_list.get(id))}/>)}
          <div>
            { this.state.query !== '' && 
              <Pagination 
                page={page} 
                total_pages={total_pages}
                changePage={(anotherPage) => this.changePage(anotherPage)}
              />
            }
          </div>
        </main>
      </>
    );
  }
}

export default App;
