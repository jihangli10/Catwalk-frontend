import React from 'react';
import Question from './QandA_Question.jsx';

class QuestionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false
    }
  }

  _compareHelpfulness (a, b) {
    if (a.question_helpfulness < b.question_helpfulness) {
      return 1;
    }
    if (a.question_helpfulness > b.question_helpfulness) {
      return -1;
    }
    return 0;
  };

  handleSeeMoreClick() {
    this.setState({
      expand: true
    })
  }

  render() {
    let showButton = this.props.questions.length >= 5;
    return (
      <div> {
        this.props.questions.sort(this._compareHelpfulness).map((question, index) => {
          if (index <= 3 || this.state.expand === true) {
            return <Question question={question} key={question.question_id} />;
          } else {
            return null;
          }
        })
      }
      {showButton ? <button onClick={this.handleSeeMoreClick.bind(this)}>MORE ANSWERED QUESTIONS</button> : null}
      <button>ADD A QUESTION +</button>
      </div>
    )
  }
}

export default QuestionList;