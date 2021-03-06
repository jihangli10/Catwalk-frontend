import React from 'react'

var ImageCarousel = ({ showExpandedImage, currentImage, currentProductStyle, onClose, handlePrevSlide, handleNextSlide, activeIndex }) => (
  <div className='carouselContainer'>
    <div className='carouselLeft'>

      {activeIndex === 0 ? null: <button onClick={handlePrevSlide}>L</button>}
    </div>
    <div className='carouselImage'>
    <img src={currentImage} className='mainImage'></img>
    <button onClick={onClose}>Close</button>
    </div>
    <div className='carouselRight'>
      {activeIndex === currentProductStyle.results.length-1 ? null: <button onClick={handleNextSlide}>R</button>}
    </div>
  </div>
)

export default ImageCarousel;