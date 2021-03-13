import React from 'react'

var ImageCarousel = ({ showExpandedImage, currentImage, currentProductStyle, onClose, handlePrevSlide, handleNextSlide, activeIndex, imageZoomed, imageZoomIn, imageZoomOut, handleMouseMove, mouseX, mouseY, currentZoomImage }) => {

  const transform = {
    transformOrigin: `${mouseX}% ${mouseY}%`
  }
  const isZoom = Object.assign({}, transform, {
    transform: imageZoomed ? 'scale(2.5)' : 'scale(1.0)',

    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    width: imageZoomed ? '1800px' : '720px',
    marginLeft: '0px',
    marginRight: '0px',
    height: imageZoomed ? '1440px' : '576px',
    backgroundSize: 'cover',
    overflow: 'hidden',
//imageZoomed ? '1440px' : '576px'
    transition: 'transform .1s ease-out'
  })


  const imgStyles = {
    height: imageZoomed ? '760px' : 'fit-content', //450 //480
    width: imageZoomed ? '760px' : 'fit-content', //690
    backgroundSize: 'cover',
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