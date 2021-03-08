import React from 'react'

var MiniCarouselStyle = ({ element, isActive, handleMiniStyle}) => (
  <img className='test5' style={isActive ? { border: '2px solid green' } : null} onClick={handleMiniStyle} src={element.photos[0].thumbnail_url} width='50px' height='50px' className='grid-item2'></img>
)

export default MiniCarouselStyle;