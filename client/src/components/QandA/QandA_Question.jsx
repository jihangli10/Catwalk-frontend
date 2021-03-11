import React from 'react';
import Answer from './QandA_Answer.jsx';
import axios from 'axios';
import Highlighter from "react-highlight-words";

class Question extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      expand: false,
      reported: false,
      helpfulness: 0,
      helpClicked: false
    }
  }

  componentDidMount () {
    this.setState({
      helpfulness: this.props.question.question_helpfulness
    })
  }

  _compareHelpfulness (a, b) {
    if (b.answerer_name.toLowerCase() === 'seller') {
      return 1;
    }
    if (a.answerer_name.toLowerCase() === 'seller') {
      return -1;
    }
    if (a.helpfulness < b.helpfulness) {
      return 1;
    }
    if (a.helpfulness > b.helpfulness) {
      return -1;
    }
    return 0;
  };

  handleSeeMoreOrCollapseClick(e) {
    e.preventDefault();
    this.setState({
      expand: !this.state.expand
    })
  }

  handleQuestionHelpfulClick(e) {
    e.preventDefault();
    return axios.put(`/qa/questions/${this.props.question.question_id}/helpful`, {params: { question_id: this.props.question.question_id }})
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

  render() {
    const question = this.props.question;
    let showButton = Object.values(question.answers).length >= 3;
    let hasAnswer = Object.values(question.answers).length >= 1;
    return (
      <div className="section-question">
        <div className="question-header">
          <b><div className="qanda-content-container">
            <div className="qanda-symbol">Q:</div>
            <Highlighter
              highlightClassName="YourHighlightClass"
              searchWords={this.props.searchQuery.length >= 3? this.props.searchQuery.split(' ') : []}
              autoEscape={true}
              textToHighlight={question.question_body}
            />

          </div></b>
          <div className="question-actions">&nbsp;&nbsp;Helpful?&nbsp;&nbsp;
            {this.state.helpClicked?
              <span className="yes-help-clicked">Yes</span> :
              <a onClick={this.handleQuestionHelpfulClick.bind(this)} href="#">Yes</a>}
            ({this.state.helpfulness})&nbsp;&nbsp;|&nbsp;&nbsp;
            <a href="#" questionbody={question.question_body} questionid={this.props.question.question_id} onClick={this.props.handleAddAnswerClick}>Add Answer</a>
          </div>
        </div>

        {/* Answer List */}
        <div>
        {hasAnswer?
          <div className="qanda-content-container">
            <div className="qanda-symbol section-answer"><b>A:</b></div>
            <div>
            {Object.values(question.answers)
              .sort(this._compareHelpfulness)
              .map((answer, index) => {
                if (index <= 1 || this.state.expand === true) {
                  return <Answer
                    answer={answer}
                    key={answer.id}
                    searchQuery={this.props.searchQuery}
                    handleImageClick={this.props.handleImageClick}
                  />;
                } else {
                  return null;
                }
            })}
            {showButton ? <a href="#" onClick={this.handleSeeMoreOrCollapseClick.bind(this)}>{this.state.expand? 'COLLAPSE' : 'LOAD MORE'} ANSWERS</a> : null}
            </div>

          </div>
        : <div>This question has no answer.</div>}
        </div>


      </div>
    )
  }
}

export default Question;