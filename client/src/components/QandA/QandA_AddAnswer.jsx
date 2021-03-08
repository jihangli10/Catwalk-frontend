import React from 'react';
import axios from 'axios';
import PhotoGallery from './QandA_PhotoGallery.jsx';
import config from '../../../../config.js';

class AddAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addQuery: '',
      addValid: false,
      nicknameQuery: '',
      nicknameValid: false,
      emailQuery: '',
      emailValid: false,
      showError: false,
      photos: [],
    };
  }

  _isInputValid() {
    let emailParts = this.state.emailQuery.split('@');
    let emailValid = function() {
      if (emailParts.length === 2 && emailParts[0] !== '' && emailParts[1] !== '') {
        let domain = emailParts[1].split('.');
        return domain.length >= 2 && domain.every(part => {
          return part !== ''})
      }
      return false;
    }();
    let addValid = this.state.addQuery !== '';
    let nicknameValid = this.state.nicknameQuery !== '';
    if (addValid && nicknameValid && emailValid) {
      return true;
    } else {
      this.setState({
        addValid,
        nicknameValid,
        emailValid
      });
      return false;
    }
  }

  addOnChange(e) {
    this.setState({addQuery: e.target.value})
  }
  nicknameOnChange(e) {
    this.setState({nicknameQuery: e.target.value})
  }
  emailOnChange(e) {
    this.setState({emailQuery: e.target.value})
  }

  handleUploadPhoto(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    const settings = {
      method: 'POST',
      url: `https://api.imgbb.com/1/upload?key=${config.imgBBToken}`,
      data: formData,

    }
    return axios(settings)
      .then(res => {
        let photos = this.state.photos
        photos.push(res.data.data.url);
        this.setState({
          photos: photos
        })
      })
      .catch(err => {
        console.log(err)
      })

  }

  handleSubmit(e) {
    e.preventDefault();
    if (this._isInputValid()) {
      let body = {
        "body": this.state.addQuery,
        "name": this.state.nicknameQuery,
        "email": this.state.emailQuery,
        "photos": this.state.photos
      };
      return axios.post(`/qa/questions/${this.props.question_id}/answers`, body)
      .then(() => {
        alert('Your answer is submitted!');
        this.props.handleAddAnswerClose();
        this.props.forceUpdate();
      })
      .catch(err => {
        console.log(err);
      })
    } else {
      this.setState({
        showError: true
      })
    }
  }

  handlePhotoDelete(e) {
    if (document.getElementById('add-answer-photo') === null) {
      document.getElementById('add-answer-photo').value = null;
    }
    let newPhotos = this.state.photos;
    newPhotos.splice(e.target.getAttribute('index'), 1);
    this.setState({
      photos: newPhotos
    })
  }

  render() {
    return (
      <div className="qanda-modal-wrapper">
        <div className="qanda-modal-backdrop"  onClick={this.props.handleAddAnswerClose}/>
        <div className="qanda-modal-box">

        <i className="far fa-times-circle fa-2x" onClick={this.props.handleAddAnswerClose}></i>
        <h1>Submit your Answer</h1>
        <h3>{this.props.product_name}: {this.props.question_body}</h3>

        <div className="qanda-form-entry">
          <div className="qanda-form-row"><label htmlFor="add-answer-input">*Your Answer</label></div>
          <div><textarea
            id="qanda-add-input"
            placeholder="Why did you like the product or not?"
            value={this.state.addQuery}
            onChange={this.addOnChange.bind(this)}/></div>
          <div className="qanda-error-message" style={{ display: this.state.showError && !this.state.addValid ? "block" : "none" }}>Please enter your answer!</div>
        </div>

        <div className="qanda-form-entry">
          <div className="qanda-form-row">
            <span><label htmlFor="add-answer-nickname">*What is your nickname</label></span>&nbsp;&nbsp;&nbsp;
           <span className="qanda-explain">For privacy reasons, do not use your full name or email address.</span>
          </div>
          <div><input
            type='text'
            id="add-answer-nickname"
            placeholder="Example: jackson11!"
            value={this.state.nicknameQuery}
            onChange={this.nicknameOnChange.bind(this)}/></div>
          <div className="qanda-error-message" style={{ display: this.state.showError && !this.state.nicknameValid ? "block" : "none" }}>
            <span>Please enter your nickname</span>
          </div>
        </div>

        <div className="qanda-form-entry">
          <div className="qanda-form-row">
            <span><label htmlFor="add-answer-email">*Your email</label></span>&nbsp;&nbsp;&nbsp;
            <span className="qanda-explain">For authentication reasons, you will not be emailed.</span>
          </div>
          <div><input
            type='text'
            id="add-answer-email"
            placeholder="What is your email address?"
            value={this.state.emailQuery}
            onChange={this.emailOnChange.bind(this)}/></div>
          <div className="qanda-error-message" style={{ display: this.state.showError && !this.state.emailValid ? "block" : "none" }}>
            Please enter a valid email address!
          </div>
        </div>


        <div className="qanda-form-entry">

          {this.state.photos.length <= 4?
          <div>
          <div className="qanda-form-row"><label htmlFor="add-answer-photo">Upload your photos</label></div>
          <div><input type="file" id="add-answer-photo" name="answer-photos" onChange={this.handleUploadPhoto.bind(this)}/></div>
          </div>
          : <div className="qanda-error-message">You've reached the maxmimum number of uploads (5 photos)</div>}
          <PhotoGallery photos={this.state.photos} deletable={false} handlePhotoDelete={this.handlePhotoDelete.bind(this)}/>
        </div>

        <div><button onClick={this.handleSubmit.bind(this)}>Submit Answer</button></div>
        </div>
      </div>
    )
  }
}


export default AddAnswer;