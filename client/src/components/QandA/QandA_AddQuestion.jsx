import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import Track from '../../withTracking.jsx';

class AddQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addQuery: '',
      addValid: false,
      nicknameQuery: '',
      nicknameValid: false,
      emailQuery: '',
      emailValid: false,
      showError: false
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

  handleSubmit(e) {
    e.preventDefault();
    if (this._isInputValid()) {
      let body = {
        "body": this.state.addQuery,
        "name": this.state.nicknameQuery,
        "email": this.state.emailQuery,
        "product_id": parseInt(this.props.product_id, 10)
      };
      return axios.post('/qa/questions', body)
      .then((res) => {
        alert('Your question is submitted!');
        this.props.handleAddQuestionClose();
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

  render() {
    return ReactDOM.createPortal(
      <Track>
      <div className="qanda-modal-wrapper">
        <div className="qanda-modal-backdrop"  onClick={this.props.handleAddQuestionClose}/>
        <div className="qanda-modal-box">

        <i className="far fa-times-circle fa-2x qanda-clickable" onClick={this.props.handleAddQuestionClose}></i>
        <h1>Ask your question</h1>
        <h3>About the {this.props.product_name}</h3>
        <div className="qanda-form-entry">
          <div className="qanda-form-row"><label htmlFor="add-question-input">*Your Question</label></div>
            <div><textarea
              id="qanda-add-input"
              placeholder="Why did you like the product or not?"
              value={this.state.addQuery}
              onChange={this.addOnChange.bind(this)}/></div>
            <div className="qanda-error-message" style={{ display: this.state.showError && !this.state.addValid ? "block" : "none" }}>Please enter your question!</div>
        </div>
        <div className="qanda-form-entry">
          <div className="qanda-form-row">
            <span><label htmlFor="add-question-nickname">*What is your nickname</label></span>&nbsp;&nbsp;&nbsp;
            <span className="qanda-explain">For privacy reasons, do not use your full name or email address.</span>
          </div>
            <div><input
              type='text'
              id="add-question-nickname"
              placeholder="Example: jackson11!"
              value={this.state.nicknameQuery}
              onChange={this.nicknameOnChange.bind(this)}/></div>
            <div className="qanda-error-message" style={{ display: this.state.showError && !this.state.nicknameValid ? "block" : "none" }}>Please enter your nickname</div>
        </div>

        <div className="qanda-form-entry">
          <div className="qanda-form-row">
            <span><label htmlFor="add-question-email">*Your email</label></span>&nbsp;&nbsp;&nbsp;
            <span className="qanda-explain">For authentication reasons, you will not be emailed.</span>
          </div>
            <div><input
              type='text'
              id="add-question-email"
              placeholder="What is your email address?"
              value={this.state.emailQuery}
              onChange={this.emailOnChange.bind(this)}/></div>
            <div className="qanda-error-message" style={{ display: this.state.showError && !this.state.emailValid ? "block" : "none" }}>Please enter a valid email address!</div>
        </div>

          <div><button onClick={this.handleSubmit.bind(this)}>Submit Question</button></div>
        </div>
      </div></Track>, document.getElementById('modal-root')
    )
  }
}


export default AddQuestion;