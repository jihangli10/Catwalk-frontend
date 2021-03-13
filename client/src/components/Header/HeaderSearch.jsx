import React from 'react';

const HeaderSearch = (props) => (
  <div id='header-search-question'>
    <input id='header-search-input' type='text' placeholder="What are you looking for?" />
    <div className="magnifier"><i className="fas mag fa-search fa-xs"></i></div>
  </div>
)

export default HeaderSearch;