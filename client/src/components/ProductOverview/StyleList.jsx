import React from 'react'

var StyleList = ({ element, isActive, handleStyle }) => (

        <img className='test5' style={isActive ? { border: '3px solid blue' } : null} onClick={handleStyle} src={element.photos[0].thumbnail_url} width='50px' height='50px' className='grid-item'></img>

)

export default StyleList