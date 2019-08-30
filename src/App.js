import React, { Component } from 'react';

import Header from './components/Header/index';
import SearchBox from './components/SearchBox/index';
import api from './api';

class App extends Component{

  state = {
    results: [],
    page: 0,
    total_pages: 0
  }

  apiKey = process.env.API_KEY

  getMovies = (query) => {
    api.get(`/search/movie?api_key=${this.apiKey}&query=${query}`)
       .then( res => {
         const { results, page, total_pages } = res.data;
         this.setState({results, page, total_pages})
      })
  }

  componentDidMount = () => this.getMovies("bad")

  render() {
    
    // console.log(this.state)
    return (
      <>
        <Header />
        <SearchBox />
        <main>
          
        </main>
      </>
    );
  }
}

export default App;
