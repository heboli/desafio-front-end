import React from 'react';

import './style.scss';

export default function SearchBox() {
  return (
    <div className="search-box">
        <input className="search-box abel" placeholder="Busque um filme por nome, ano ou gênero..." />
    </div>
  );
}
