import React from 'react'

var StyleList = ({ element, isActive, handleStyle }) => {


         const adjustStyle = {
           background: element.name,
           borderRadius: '50%',
           width: '50px',
           height: '50px',
        }

        const checkStyle = {
           position: 'absolute',
           marginLeft: '45px'
        }

        const circleStyle = {
           position: 'absolute',
           background: 'white',
        }

        return(
           <div>{isActive ? <i className="fas fa-check" style={checkStyle}></i> : null}
           <img className='test5' style={adjustStyle} onClick={handleStyle} src={element.photos[0].thumbnail_url} width='50px' height='50px' className='grid-item'></img>
        </div>
        )
}

// /* <img className='test5' style={isActive ? { border: '3px solid blue', borderRadius: '50%' } : null} onClick={handleStyle} src={element.photos[0].url} width='50px' height='50px' className='grid-item'></img> */}
export default StyleList

//<div>
{/* <img className='test5' style={adjustStyle} onClick={handleStyle} src={element.photos[0].url} width='50px' height='50px' className='grid-item'></img>
</div> */}

//<div classNamestyle={adjustStyle} onClick={handleStyle}></div>