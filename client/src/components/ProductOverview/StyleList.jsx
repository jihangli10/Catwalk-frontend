import React from 'react'

var StyleList = ({ currentProductStyle }) => (
  <div className='styleGrid'>
    {currentProductStyle.results.map(element =>
      <img src={element.photos[0].thumbnail_url} width='50px' height='50px' className='grid-item'></img>
    )}
  </div>
)

export default StyleList