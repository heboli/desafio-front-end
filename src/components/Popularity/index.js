import React from 'react';
import classNames from 'classnames';

import './style.scss';

export default function Popularity({ value: popularity, halfDown = false, bigger = false }) {
  return (
    <div className={classNames([{"half-down": halfDown, "bigger": bigger }, "popularity"])}>
        {/* <div className="popularity"> */}
        <span className="abel">{Math.round(popularity)}%</span>
        {/* </div> */}
    </div>
  );
}
