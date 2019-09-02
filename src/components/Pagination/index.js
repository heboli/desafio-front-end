import React from 'react';
import classNames from 'classnames';
import './style.scss';

export default function Pagination({ page, total_pages, changePage }) {
  
  let pages = []
  const elementsByPage = parseInt(process.env.REACT_APP_ELEMENTS_BY_PAGE) || 5;  
  //5 pags
  let start = page - Math.floor(elementsByPage/2)
  let end = start + elementsByPage

  if(start <= 0){
    start = 1
    end = start + elementsByPage
  }
  
  if(end > total_pages + 1){
    end = total_pages + 1
    start = end - elementsByPage > 0 ? end - elementsByPage : 1
  }

  for(let i = start; i < end; i++){
    pages.push(i)
  }

  pages = pages.map( (page_num) =>
                      <button 
                        key={page_num} 
                        className={classNames({ current: page_num === page, abel: true })}
                        onClick={ () => changePage(page_num)}
                      >{page_num}</button>
  )

  return (
    <footer className="pagination">
        {pages.map( (page, index) => <div key={index} className="bttn-container">{page}</div> )}
    </footer>
  );
}
