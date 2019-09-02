import React from 'react';
import { Link } from 'react-router-dom';
import search from '../../search.png';
import err404 from '../../err404.png';

import './style.scss';

export default function Illustration({content}) {
  const illustrations = { search, err404 }
  const msgs = {
    search: 'Procurando algum filme?',
    err404: [
      '[Erro 404] Algo de errado aconteceu! ',
      <Link key={1} to="/">Voltar ao início</Link>
    ]
  }
  return (
    <div className="illustration">
      <img src={illustrations[content]} alt={`${content} illustration`} />
      <p className="lato">{msgs[content]}</p>
      <p className="lato attribution">
        illustration by <a href="https://icons8.com">Ouch.pics</a>
      </p>
    </div>
  );
}
