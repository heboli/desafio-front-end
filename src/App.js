import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { searchMovies, getMoviesGenres } from './api';
import Header from './components/Header/';
import SearchBox from './components/SearchBox/';
import Card from './components/Card/';
import Pagination from './components/Pagination/';
import Details from './components/Details/';
import Illustration from './components/Illustration/';

class App extends Component{

  state = {
    results: [],
    page: 1,
    original_page: 1,
    total_pages: 1,
    genre_list: new Map(),
    status: 'search',
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

    this.setState({ status: 'loading' })

    const data = await searchMovies(query, original_page)
    const { results, total_pages } = data;
    ({ original_page } = data)

    this.setState({ results, total_pages, page, query, original_page, status: query === '' ? 'search' : null })
  }

  componentDidUpdate = () => {
    const original_page = Math.floor((this.state.page - 1)/4) + 1

    if(original_page !== this.state.original_page){
      console.log("Updating...")
      this.updateMovies({ original_page })
    }
  }

  render() {
    const { page, total_pages, genre_list, query, status: illustration } = this.state
    const start = ((page - 1) * this.elementsByPage) % 20
    const end = start + this.elementsByPage
    const movies = this.state.results.slice(start, end)
    
    return (
      <>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <SearchBox handle={(query) => this.updateMovies({ query })} value={query} listenerChange />
              <main>
                {movies.map( (movie, index) => 
                  <Card movie={movie} key={index} genres={movie.genre_ids.map((id) => genre_list.get(id))}/> )
                }
                {!!illustration && <Illustration content={illustration} />}
              </main>
              {query !== '' &&
                <Pagination 
                  page={page} 
                  total_pages={total_pages}
                  changePage={(newPage) => this.setState({ page: newPage })} 
                />
              }
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
