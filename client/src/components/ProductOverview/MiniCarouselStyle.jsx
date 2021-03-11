import React from 'react'

var MiniCarouselStyle = ({ element, isActive, handleMiniStyle}) => {
  const borderStyle = {
    borderBottomStyle: isActive ? 'solid' : null,
    borderBottomColor: isActive ? 'white' : null,
    borderBottomWidth: isActive ? 'thick' : null
  }


  return (
  <img className='test5' style={borderStyle} onClick={handleMiniStyle} src={element.photos[0].thumbnail_url} width='50px' height='50px' className='grid-item2'></img>
)
}
export default MiniCarouselStyle;