import React from 'react';
import AddAnswer from './QandA_AddAnswer.jsx';
import AddQuestion from './QandA_AddQuestion.jsx';
import QuestionList from './QandA_QuestionList.jsx';
import Search from './QandA_Search.jsx';
import myData from '../../sampleData.json';

class QandA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: myData.results
    }
  }



  render() {
    return (
      <div>
      <h1>Question and Answers</h1>
      <Search />
      <QuestionList questions={this.state.questions}/>
      </div>
    )
  }
}

export default QandA;