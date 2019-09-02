import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { searchMovies, getMoviesGenres } from './api';
import Header from './components/Header/index';
import SearchBox from './components/SearchBox/index';
import Card from './components/Card/index';
import Pagination from './components/Pagination/index';
import Details from './components/Details/index';
import Illustration from './components/Illustration/index';

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
    const genre_list = await getMoviesGenres()
    this.setState({ genre_list })
  }

  updateMovies = async ({ original_page = this.state.original_page, query = this.state.query, page = this.state.page }) => {
    if(query !== this.state.query){
      page = original_page = 1
    }

    const data = await searchMovies(query, original_page)
    const { results, total_pages } = data;
    ({ original_page } = data)

    this.setState({ results, total_pages, page, query, original_page })
  }

  componentDidUpdate = () => {
    const original_page = Math.floor((this.state.page - 1)/4) + 1

    if(original_page !== this.state.original_page){
      console.log("Updating...")
      this.updateMovies({ original_page })
    }
  }

  render() {
    const { page, total_pages, genre_list } = this.state
    const start = ((page - 1) * this.elementsByPage) % 20
    const end = start + this.elementsByPage
    const movies = this.state.results.slice(start, end)
    
    return (
      <>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <SearchBox handle={(query) => this.updateMovies({ query })} value={this.state.query} listenerChange />
              <main>
                {movies.map( (movie, index) => 
                  <Card movie={movie} key={index} genres={movie.genre_ids.map((id) => genre_list.get(id))}/> )
                }
                { this.state.query === '' ? 
                  <Illustration content="search" /> :
                  <Pagination 
                    page={page} 
                    total_pages={total_pages}
                    changePage={(newPage) => this.setState({ page: newPage })} 
                  />
                }
              </main>
            </Route>
            <Route 
              path="/movie/:id"
              render={(props) =>
                        <main>
                          <Details {...props} />
                        </main>
              }
            />
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;
