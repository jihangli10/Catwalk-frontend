import React from 'react';

const Search = ({handleQueryChange, searchQuery}) => (
  <div id='search-question'>
    <input id='search-question-input' type='text' onChange={handleQueryChange} placeholder="Have a question? Search for answers..." value={searchQuery}/>
  </div>
)

export default Search;