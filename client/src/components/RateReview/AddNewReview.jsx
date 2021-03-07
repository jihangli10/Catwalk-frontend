import React from 'react';
import axios from 'axios';
import AddNewReviewContents from './AddNewReviewContents';

class AddNewReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showError: false
    };

  }

  handleErrors() {
    console.log(this.state.showError)
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this._isInputValid()) {
      var body = {
        "body": this.state.addQuestionQuery,
        "name": this.state.nicknameQuery,
        "email": this.state.emailQuery,
        "product_id": parseInt(this.props.product_id, 10)
      };
      console.log(body);
      return axios.post('/qa/questions', body)
        .then(() => {
          alert('Your Question is submitted!');
          this.props.handleAddReviewClick();
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
    return (
      <div className="qanda-modal-wrapper">
        <div className="qanda-modal-backdrop" onClick={this.props.handleAddReviewClick} />
        <div className="qanda-modal-box">
          <i className="far fa-times-circle fa-2x" onClick={this.props.handleAddReviewClick}></i>
          <br></br>
          <AddNewReviewContents key={'ratings' + this.state.rating} addNewReviewProduct={this.props.addReviewProd}/>
          <div><button onClick={this.handleSubmit.bind(this)}>SUBMIT</button></div>
        </div>
      </div>
    )
  }
}
export default AddNewReview;
