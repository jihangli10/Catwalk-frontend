import React from 'react';
import Image from './QandA_Image.jsx';
import axios from 'axios';

class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpfulness: this.props.answer.helpfulness,
      helpClicked: false,
      reported: false
    }
  }

  handleAnswerHelpfulClick(e) {
    e.preventDefault();
    return axios.put(`/qa/answers/${this.props.answer.id}/helpful`, {params: { answer_id: this.props.answer.id }})
      .then(() => {
        this.setState({
          helpfulness: this.state.helpfulness + 1,
          helpClicked: true
        });
      })
      .catch(err => {
        console.log('failed to update helpfulness');
      })
  }

  handleAnswerReport(e) {
    e.preventDefault();
    return axios.put(`/qa/answers/${this.props.answer.id}/report`, {params: { answer_id: this.props.answer.id }})
    .then(() => {
      this.setState({
        reported: true
      });
    })
    .catch(err => {
      console.log('failed to report');
    })
  }

  render() {
    let answer = this.props.answer;
    return (
      <div className="section-answer">
      <div><strong>A: </strong>{answer.body}</div>
      <div className="answer-image-container">{answer.photos.map((photo, index) => (
        <Image photo={photo} key={index}/>
      ))}</div>
      <div>
        <span>by {answer.answerer_name}, </span>
        <span>{(new Date(answer.date).toDateString())}</span> |
        <span> Helpful?
          {this.state.helpClicked?
            <span className="yes-help-clicked">Yes</span> :
            <a onClick={this.handleAnswerHelpfulClick.bind(this)} href="#">Yes</a>}
          ({this.state.helpfulness})</span> |
        <span>
          {this.state.reported?
            <span className="report-clicked"> Reported</span> :
            <a onClick={this.handleAnswerReport.bind(this)} href="#"> Report</a>}
        </span>
      </div>
    </div>
    )
  }
}

export default Answer;