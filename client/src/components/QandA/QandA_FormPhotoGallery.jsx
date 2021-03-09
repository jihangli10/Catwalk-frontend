import React from 'react';

const FormPhotoGallery = ({photos, handlePhotoDelete, handleImageClick}) => (
  <div className="answer-image-container">
    {photos.map((photo, index) => (
    <div className="answer-image-individual-container" key={index} >
      <img className="answer-photo clickable" src={photo} onClick={handleImageClick}/>
      <i className="far fa-times-circle qanda-clickable modal-gallery-close-button" onClick={handlePhotoDelete} index={index}></i>
    </div>
  ))}
</div>
)

export default FormPhotoGallery;