import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';

const ImageZoom = ({photo, handleImageClose}) => {
  return ReactDOM.createPortal(
    <div className="qanda-modal-wrapper">
    <div className="qanda-modal-backdrop"  onClick={handleImageClose}/>
    <div className="qanda-picture-box">
      <img className="qanda-zoomin-picture" src={photo}/>
      <i className="far fa-times-circle fa-2x qanda-clickable qanda-close-button" onClick={handleImageClose}></i>
    </div>
  </div>, document.getElementById('modal-root')
  )
}

export default ImageZoom;