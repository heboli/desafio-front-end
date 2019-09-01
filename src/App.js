import React, { Component } from 'react';

import Header from './components/Header/index';
import SearchBox from './components/SearchBox/index';
import Card from './components/Card/index';
import Pager from './components/Pager/index';
import searchMovies from './api';

class App extends Component{

  state = {
    results: [],
    page: 1,
    original_page: 1,
    total_pages: 1,
    query: ''
  }

  apiKey = process.env.API_KEY
  elementsByPage = process.env.ELEMENTS_BY_PAGE


  // componentDidMount = () => this.getMovies("olar", 1)

  changeQuery = async (query) => {      
    const {results, total_pages, original_page} = await searchMovies(query, 1)
    console.log("set:", results, total_pages)
    this.setState({results, total_pages, query, original_page})
  }

  changePage = (page) => {
    const elementsByPage = this.elementsByPage
    if((page - 1)/elementsByPage != page){
      
    }
  }

  render() {
    
    console.log("state",this.state)
    // const index = 
    const { page, total_pages } = this.state
    const movies = this.state.results.slice(page, page + 5)
    // const movies = []
    // const pages = this.generatePagesRange(page, total_pages)
    
    return (
      <>
        <Header />
        <SearchBox handle={(query) => this.changeQuery(query)}/>
        <main>
          {movies.map((movie, index) => <Card movie={movie} key={index} />)}
          <div>
            { this.state.query !== '' && 
              <Pager 
                page={page} 
                total_pages={total_pages}
                changePage={(anotherPage) => this.setState({page: anotherPage})}
              />
            }
          </div>
        </main>
      </>
    );
  }
}

export default App;
