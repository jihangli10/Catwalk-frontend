import React from 'react'
import ImageCarousel from './ImageCarousel'
var ImageModal = ({ showExpandedImage, currentImage, currentProductStyle, onClose, handlePrevSlide, handleNextSlide, activeIndex, imageZoomed, imageZoomIn, imageZoomOut, handleMouseMove, mouseX, mouseY }) => (
  <div>
    {showExpandedImage ? <div
      className='modalImage2'>
       <ImageCarousel
        showExpandedImage = {showExpandedImage}
        currentImage = {currentImage}
        currentProductStyle = {currentProductStyle}
        onClose = {onClose}
        handlePrevSlide = {handlePrevSlide}
        handleNextSlide = {handleNextSlide}
        activeIndex = {activeIndex}
        imageZoomed = {imageZoomed}
        imageZoomIn = {imageZoomIn}
        imageZoomOut = {imageZoomOut}
        handleMouseMove = {handleMouseMove}
        mouseX = {mouseX}
        mouseY = {mouseY}
       />

       </div>: null}


  </div>
);




export default ImageModal