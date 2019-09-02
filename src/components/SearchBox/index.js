import React, { Component } from 'react';

import './style.scss';

class SearchBox extends Component{
  state = {
    query: ''
  }

  handleChange = (event) => {
    this.props.handle(event.target.value)
  }

  render() {
    return (
      <div className="search-box">
        <input
          className="search-box abel" 
          placeholder="Busque um filme por nome, ano ou gênero..." 
          onChange={this.handleChange.bind(this)}
          defaultValue={this.props.value}
        />
      </div>
    );
  }

}

export default SearchBox;