import React from 'react';
import classNames from 'classnames';
// import './style.scss';

export default function Pager({page, total_pages, changePage}) {
  
  let pages = []
  const elementsByPage = 5;  
  //5 pags
  let start = page - Math.floor(elementsByPage/2)
  let end = start + elementsByPage
  // console.log(start, end - 1)
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

  pages = pages.map((page_num) =>{
    return <button 
              key={page_num} 
              className={classNames({selected: page_num === page })}
              onClick={ () => changePage(page_num)}
           >{page_num}</button>
  })

  return (
    <div>
      {pages}
    </div>
  );
}
