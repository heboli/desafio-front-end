import React from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

export default function Header() {
  return (
    <header className="header">
      <h1 className="abel"><Link to="/">Movies</Link></h1>
    </header>
  );
}
