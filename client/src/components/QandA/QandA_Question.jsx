import React from 'react';
import Answer from './QandA_Answer.jsx';

class Question extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      expand: false
    }
  }

  _compareHelpfulness (a, b) {
    if (a.helpfulness < b.helpfulness) {
      return 1;
    }
    if (a.helpfulness > b.helpfulness) {
      return -1;
    }
    return 0;
  };

  handleSeeMoreOrCollapseClick() {
    this.setState({
      expand: !this.state.expand
    })
  }

  render() {
    const question = this.props.question;
    let showButton = Object.values(question.answers).length >= 3;
    return (
      <div>
        <div>Q: {question.question_body}</div>
        <span> Helpful? <a href="#">Yes</a> ({question.question_helpfulness})</span> |
      <span><a href="#"> Add Answer</a></span>
        {Object.values(question.answers)
          .sort(this._compareHelpfulness)
          .map((answer, index) => {
            if (index <= 1 || this.state.expand === true) {
              return <Answer answer={answer} key={answer.id} />;
            } else {
              return null;
            }
        })}
        {showButton ? <a href="#" onClick={this.handleSeeMoreOrCollapseClick.bind(this)}>{this.state.expand? 'COLLAPSE' : 'LOAD MORE'} ANSWERS</a> : null}
      </div>
    )
  }
}
({question}) => {



}

export default Question;