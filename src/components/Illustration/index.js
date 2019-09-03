import React from 'react';
import { Link } from 'react-router-dom';
import search from '../../search.png';
import err404 from '../../err404.png';
import empty from '../../empty.png';
import loading from '../../loading.png';

import './style.scss';

export default function Illustration({content}) {
  const illustrations = { search, err404, empty, loading }
  const msgs = {
    search: 'Procurando algum filme?',
    err404: [
      '[Erro 404] Algo de errado aconteceu! ',
      <Link key={1} to="/">Voltar ao início</Link>
    ],
    empty: 'Parece que não há nada por aqui!',
    loading: 'Carregando...'
  }
  
  return (
    <section className="illustration">
      <img src={illustrations[content]} alt={`${content} illustration`} />
      <p className="lato">{msgs[content]}</p>
      <footer>
        <p className="lato attribution">
          illustration by <a href="https://icons8.com">Ouch.pics</a>
        </p>
      </footer>
    </section>
  );
}
