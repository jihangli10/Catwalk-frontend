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


  render() {
    return (
      <div id='question-list'> {
        this.props.questions
          .sort(this._compareHelpfulness)
          .map((question, index) => {
            if (index < this.props.showQuestionNumber) {
              return <Question question={question} key={question.question_id} searchQuery={this.props.searchQuery}/>;
            } else {
              return null;
            }
          })
      }

      </div>
    )
  }
}

export default QuestionList;