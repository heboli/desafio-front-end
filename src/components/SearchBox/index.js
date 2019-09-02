import React, { Component } from 'react';

import './style.scss';

class SearchBox extends Component{
  handleChange = (event) => {
    this.props.handle(event.target.value)
    // console.log(this.props.getMovies)
  }
  render() {
    return (
      <div className="search-box">
        <input
          className="search-box abel" 
          placeholder="Busque um filme por nome, ano ou gênero..." 
          onChange={this.handleChange.bind(this)}
        />
      </div>
    );
  }

}

export default SearchBox;