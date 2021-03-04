import React from 'react';
import AddAnswer from './QandA_AddAnswer.jsx';
import AddQuestion from './QandA_AddQuestion.jsx';
import QuestionList from './QandA_QuestionList.jsx';
import Search from './QandA_Search.jsx';
import axios from 'axios';

class QandA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      searchQuery: '',
      displayQuestions: [],
      showQuestionNumber: 2
    }
  }

  componentDidMount() {
    return axios.get('/qa/questions', {params: { product_id: 19378 }})
      .then(data => {
        this.setState({
          questions: data.data.results,
          displayQuestions: data.data.results
        })
      })
      .catch(err => {
      console.log(err);
      });
  }

  handleQueryChange(e) {
    if (e.target.value.length >= 3) {
      let queries = e.target.value.toLowerCase().split(' ');
      let displayQuestions = this.state.questions.filter(question => {
        return queries.every(query => {
          return question.question_body.toLowerCase().includes(query) ||
            Object.values(question.answers).some(answer => {
              return answer.body.toLowerCase().includes(query);
            })
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

  handleSeeMoreClick(e) {
    e.preventDefault();
    this.setState({
      showQuestionNumber: this.state.showQuestionNumber + 2
    })
  }

  render() {
    let showButton = this.state.questions.length > this.state.showQuestionNumber;
    return (
      <div id='qanda' >
        <br></br>
        <div className='section'>Question and Answers</div>
        <Search
          handleQueryChange={this.handleQueryChange.bind(this)}
          searchQuery={this.state.searchQuery}
        />
        <QuestionList questions={this.state.displayQuestions} showQuestionNumber={this.state.showQuestionNumber} searchQuery={this.state.searchQuery}/>
        <div id="question-button-row">
        {showButton ? <button onClick={this.handleSeeMoreClick.bind(this)}>MORE ANSWERED QUESTIONS</button> : null}
        &nbsp;&nbsp;<button>ADD A QUESTION +</button>
        </div>
        <br></br>
      </div>
    )
  }
}

export default QandA;