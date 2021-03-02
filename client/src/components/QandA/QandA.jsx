import React from 'react';
import AddAnswer from './QandA_AddAnswer.jsx';
import AddQuestion from './QandA_AddQuestion.jsx';
import QuestionList from './QandA_QuestionList.jsx';
import Search from './QandA_Search.jsx';
import myData from '../../sampleData.json';
import httpHandler from './httpHandler.js';

class QandA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      searchQuery: '',
      displayQuestions: []
    }
  }

  componentDidMount() {
    httpHandler.getQuestions(19378)
      .then(data => {
        this.setState({
          questions: data.data.results,
          displayQuestions: data.data.results
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  handleQueryChange(e) {
    if (e.target.value.length >= 3) {
      let queries = e.target.value.toLowerCase().split(' ');
      let displayQuestions = this.state.questions.filter(question => {
        return queries.every(query => {
          return question.question_body.toLowerCase().includes(query);
        });
      });
      this.setState({
        searchQuery: e.target.value,
        displayQuestions: displayQuestions
      });
    } else {
      this.setState({
        searchQuery: e.target.value,
        displayQuestions: this.state.questions
      });
    }
  }

  render() {
    return (
      <div id='qanda' >
        <br></br>
        <div className='section'>Question and Answers</div>
        <Search
          handleQueryChange={this.handleQueryChange.bind(this)}
          searchQuery={this.state.searchQuery}
        />
        <QuestionList questions={this.state.displayQuestions}/>
        <br></br>
      </div>
    )
  }
}

export default QandA;