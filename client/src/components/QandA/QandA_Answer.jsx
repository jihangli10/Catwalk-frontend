import React from 'react';
import axios from 'axios';
import Highlighter from "react-highlight-words";
import PhotoGallery from './QandA_PhotoGallery.jsx';

class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpfulness: 0,
      helpClicked: false,
      reported: false,
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
    let isSeller = answer.answerer_name.toLowerCase() === 'seller';
    return (
      <div className="section-answer">
        <div className="answer-body">
        <Highlighter
          highlightClassName="highlighted-word"
          searchWords={this.props.searchQuery.length >= 3? this.props.searchQuery.split(' ') : []}
          autoEscape={true}
          textToHighlight={answer.body}
        />
        </div>
      <PhotoGallery photos={answer.photos} deletable={false} handleImageClick={this.props.handleImageClick}/>
      <div className="answer-user-information">
        <span style={{ fontWeight: isSeller ? "bold" : 200 }}><i className="fas fa-user-check qanda-fa-user-check"></i> {answer.answerer_name},&nbsp;&nbsp;</span>
        <span className="qanda-date">{(new Date(answer.date).toDateString().slice(4))}</span>&nbsp;&nbsp;|&nbsp;&nbsp;
        <span>&nbsp;Helpful?&nbsp;&nbsp;
          {this.state.helpClicked?
            <span className="yes-help-clicked">Yes&nbsp;&nbsp;</span> :
            <a onClick={this.handleAnswerHelpfulClick.bind(this)} href="#">Yes</a>}
          ({this.state.helpfulness})</span>&nbsp;&nbsp;|&nbsp;&nbsp;
        <span>&nbsp;
          {this.state.reported?
            <span className="report-clicked">Reported&nbsp;</span> :
            <a onClick={this.handleAnswerReport.bind(this)} href="#">Report</a>}
        </span>
      </div>
    </div>
    )
  }
}

export default Answer;