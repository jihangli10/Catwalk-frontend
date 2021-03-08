import React from 'react';
import axios from 'axios';

class ImageZoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photo = ''
    };
  }

  render() {
    return (
      <div className="qanda-modal-wrapper">
        <div className="qanda-modal-backdrop"  onClick={this.props.handleAddQuestionClick}/>
        <div className="qanda-modal-picture-box">
          <img src={this.props.photo}/>
          <i className="far fa-times-circle fa-2x qanda-clickable" onClick={this.props.handleAddQuestionClick}></i>


        </div>
      </div>
    )
  }
}


export default AddQuestion;