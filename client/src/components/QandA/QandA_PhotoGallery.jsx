import React from 'react';

const PhotoGallery = ({photos, deletable, handlePhotoDelete}) => (
  <div className="answer-image-container">
    {photos.map((photo, index) => (
    <div className="answer-image-individual-container" key={index} >

      {deletable? <div className="modal-close-image-button clickable"> <img onClick={handlePhotoDelete} name="outAction" height="20" src="https://img.icons8.com/windows/32/000000/xbox-x.png" index={index} /></div> : null}
      <img className="answer-photo clickable" src={photo} />
    </div>
  ))}
</div>
)

export default PhotoGallery;