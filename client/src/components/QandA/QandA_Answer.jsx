import React from 'react';
import Image from './QandA_Image.jsx';
import axios from 'axios';
import Highlighter from "react-highlight-words";

class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpfulness: 0,
      helpClicked: false,
      reported: false
    }
  }

  componentDidMount () {
    this.setState({
      helpfulness: this.props.answer.helpfulness,
    })
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

  handleImageClick(e) {
    e.preventDefault();
  }

  render() {
    let answer = this.props.answer;
    return (
      <div className="section-answer">
      <div><strong>A:{" "}</strong>
      <Highlighter
            highlightClassName="YourHighlightClass"
            searchWords={this.props.searchQuery.length >= 3? this.props.searchQuery.split(' ') : []}
            autoEscape={true}
            textToHighlight={answer.body}
          />
      </div>
      <div className="answer-image-container">{answer.photos.map((photo, index) => (
        <Image photo={photo} key={index}/>
      ))}</div>
      <div>
        <span>by {answer.answerer_name}, </span>
        <span>{(new Date(answer.date).toDateString().slice(4))}</span> |
        <span>{" "}Helpful?{" "}
          {this.state.helpClicked?
            <span className="yes-help-clicked">Yes{" "}</span> :
            <a onClick={this.handleAnswerHelpfulClick.bind(this)} href="#">Yes</a>}
          ({this.state.helpfulness})</span> | {" "}
        <span>
          {this.state.reported?
            <span className="report-clicked">Reported{" "}</span> :
            <a onClick={this.handleAnswerReport.bind(this)} href="#">Report</a>}
        </span>
      </div>
    </div>
    )
  }
}

export default Answer;