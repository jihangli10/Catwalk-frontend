import React from 'react';

const PhotoGallery = ({photos, handleImageClick}) => (
  <div className="answer-image-container">
    {photos.map((photo, index) => (
    <div className="qanda-image-individual-container" key={index} >
      <img className="answer-photo clickable" src={photo} onClick={handleImageClick}/>
    </div>
  ))}
</div>
)

export default PhotoGallery;