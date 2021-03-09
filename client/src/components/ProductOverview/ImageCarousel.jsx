import React from 'react'

var ImageCarousel = ({ showExpandedImage, currentImage, currentProductStyle, onClose, handlePrevSlide, handleNextSlide, activeIndex, imageZoomed, imageZoomIn, imageZoomOut, handleMouseMove, mouseX, mouseY, currentZoomImage }) => {

  const transform = {
    transformOrigin: `${mouseX}% ${mouseY}%`
  }
  const isZoom = Object.assign({}, transform, {
    transform: imageZoomed ? 'scale(2.5)' : 'scale(1.0)',

    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: '576px',
    maxHeight: '576px',
    maxWidth: '720px',
    backgroundSize: 'cover',
    overflow: 'hidden',

    transition: 'transform .1s ease-out'
  })


  const imgStyles = {
    height: '480px', //450 //480
    width: '720px', //690
    float: 'left',
    marginLeft: '10px',
    overflow: 'hidden',
    borderStyle: 'solid',
    cursor: imageZoomed ? 'zoom-out' : 'zoom-in',

  }
  if(imageZoomed) {
    return (
      <div className='modal-wrapper'>
    <div className='carouselContainer'>
      <div className='carouselImage2'>
      <div style={imgStyles} onMouseOver={imageZoomIn} onMouseMove={handleMouseMove} onClick={imageZoomOut}>
      <img src={currentZoomImage} style={isZoom}></img>
      </div>
      </div>
      </div>
      </div>
    )
  } else {
    return (
    <div className='modal-wrapper'>
    <div className='carouselContainer'>
    <div className='carouselLeft'>
      {console.log(activeIndex)}
      {activeIndex === 0 ? null: <button className='dumbButton' onClick={handlePrevSlide}> <i className='fas overview-fas overview-fa-chevron-left fa-chevron-left'></i> </button>}
    </div>

    <div className='carouselImage2'>
    <div style={imgStyles} onClick={imageZoomIn}>
      <img src={currentZoomImage} style={isZoom}></img>

    </div>

    </div>
    <div className='closeGrid'>
    <button className='dumbButton' onClick={onClose}><i className="far overview-far overview-fa-times-circle fa-times-circle"></i></button>
    </div>

    <div className='carouselRight'>
      {activeIndex === currentProductStyle.results.length-1 ? null: <button className='dumbButton' onClick={handleNextSlide}> <i className='fas overview-fas overview-fa-chevron-right fa-chevron-right'></i> </button>}
    </div>
  </div>
  </div>
  )
  }


}



export default ImageCarousel;