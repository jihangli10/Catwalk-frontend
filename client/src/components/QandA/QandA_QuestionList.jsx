import React from 'react';
import Question from './QandA_Question.jsx';

class QuestionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showQuestionNumber: 2
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

  handleSeeMoreClick(e) {
    e.preventDefault();
    this.setState({
      showQuestionNumber: this.state.showQuestionNumber + 2
    })
  }

  render() {
    let showButton = this.props.questions.length > this.state.showQuestionNumber;
    return (
      <div id='question-list'> {
        this.props.questions
          .sort(this._compareHelpfulness)
          .map((question, index) => {
            if (index < this.state.showQuestionNumber) {
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