import React from 'react'

var StyleList = ({ element, isActive, handleStyle }) => {
        const adjustStyle = {
           background: element.name,
           border: isActive ? '3px solid blue' : null,
           borderRadius: '50%',
           width: '50px',
           height: '50px'
        }

        return(
        <div className='circularPic' style={adjustStyle} onClick={handleStyle}></div>
        // <img className='test5' style={isActive ? { border: '3px solid blue' } : null} onClick={handleStyle} src={element.photos[0].thumbnail_url} width='50px' height='50px' className='grid-item'></img>
        )
}

export default StyleList