import React, { Component } from 'react';
import classNames from 'classnames';

import './style.scss';

class SearchBox extends Component{
  state = {
    query: ''
  }

  handleChange = (event) => {
    if(!!this.props.listenerChange){
      this.sendQuery(event.target.value)
    }else{
      this.setState({ query: event.target.value })
    }
  }
  
  handleKeyPress = (event) => {
    if(event.keyCode === 13 && !this.props.listenerChange){
      this.sendQuery()
    }
  }
  
  sendQuery = (query = this.state.query) => {
    this.props.handle(query)
  }

  render() {
    const { listenerChange } = this.props
    
    return (
      <div className="search-box">
        <input
          className={classNames([{ 'enter-key': !listenerChange }, 'abel'])}
          placeholder="Busque um filme por nome, ano ou gênero..." 
          onChange={this.handleChange.bind(this)}
          onKeyDown={this.handleKeyPress.bind(this)}
          defaultValue={this.props.value}
        />
        {!!this.state.query && <button className="enter-key lato" onClick={() => this.sendQuery()}>[Press Enter]</button>}
      </div>
    );
  }
}

export default SearchBox;