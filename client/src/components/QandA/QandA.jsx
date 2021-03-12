import React from 'react';
import AddAnswer from './QandA_AddAnswer.jsx';
import AddQuestion from './QandA_AddQuestion.jsx';
import QuestionList from './QandA_QuestionList.jsx';
import ImageZoom from './QandA_ImageZoom.jsx';
import Search from './QandA_Search.jsx';
import axios from 'axios';

class QandA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      searchQuery: '',
      displayQuestions: [],
      showQuestionNumber: 2,
      showAddQuestion: false,
      showAddAnswer: false,
      showImageZoom: false,
      product_id: null,
      question_id: null,
      question_body: null,
      photo: '',
    }
    this.handleImageClick = this.handleImageClick.bind(this);
    this.forceUpdate = this.forceUpdate.bind(this);
  }

  componentDidMount() {
    this.updateContent.apply(this);
  }

  componentDidUpdate(previousProps) {
    if (previousProps.currentProduct.id !== this.props.currentProduct.id) {
      this.updateContent.apply(this);
    }
  }

  updateContent() {
    return axios.get('/qa/questions', {params: {
      product_id: this.props.currentProduct.id,
      // product_id: 19378,
      page: 1,
      count: 1000
    }})
      .then(data => {
        this.setState({
          questions: data.data.results,
          displayQuestions: data.data.results,
          product_id: data.data.product_id
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

  handleAddQuestionClick(e) {
    e.preventDefault();
    this.setState({
      showAddQuestion: true
    })
  }

  handleAddQuestionClose() {
    this.setState({
      showAddQuestion: false
    })
  }

  handleAddAnswerClick(e) {
    e.preventDefault();
    this.setState({
      question_id: e.target.getAttribute("questionid"),
      question_body: e.target.getAttribute("questionbody"),
      showAddAnswer: true
    })
  }

  handleAddAnswerClose() {
    this.setState({
      showAddAnswer: false
    })
  }

  handleImageClick(e) {
    this.setState({
      photo: e.target.getAttribute("src"),
      showImageZoom: true
    })
  }

  handleImageClose() {
    this.setState({
      showImageZoom: false
    })
  }

  forceUpdate() {
    this.updateContent.apply(this);
  }

  render() {
    let showButton = this.state.questions.length > this.state.showQuestionNumber;
    let hasQuestion = this.state.questions.length >= 1;
    return (
      <div id='qanda' >
        <br></br>
        <div className='section'>Question and Answers</div>
        {this.state.showAddQuestion? <AddQuestion
          handleAddQuestionClose={this.handleAddQuestionClose.bind(this)}
          forceUpdate={this.forceUpdate}
          product_id={this.state.product_id}
          product_name={this.props.currentProduct.name}/>
          : null
        }

        {this.state.showAddAnswer? <AddAnswer
          handleAddAnswerClick={this.handleAddAnswerClick.bind(this)}
          handleAddAnswerClose={this.handleAddAnswerClose.bind(this)}
          handleImageClick={this.handleImageClick}
          forceUpdate={this.forceUpdate}
          question_id={this.state.question_id}
          question_body={this.state.question_body}
          product_name={this.props.currentProduct.name}
          />
          : null
        }

        {this.state.showImageZoom? <ImageZoom
          photo={this.state.photo}
          handleImageClose={this.handleImageClose.bind(this)}
          />
          : null
        }
        <Search
          handleQueryChange={this.handleQueryChange.bind(this)}
          searchQuery={this.state.searchQuery}
        />
        {hasQuestion? <QuestionList
          questions={this.state.displayQuestions}
          showQuestionNumber={this.state.showQuestionNumber}
          searchQuery={this.state.searchQuery}
          showAddAnswer={this.state.showAddAnswer}
          handleAddAnswerClick={this.handleAddAnswerClick.bind(this)}
          handleImageClick={this.handleImageClick}
        />
        : <div>This product has no questions.</div>}
        <div id="question-button-row">
        {showButton ? <button onClick={this.handleSeeMoreClick.bind(this)}>MORE ANSWERED QUESTIONS</button> : null}
        &nbsp;&nbsp;<button onClick={this.handleAddQuestionClick.bind(this)}>ADD A QUESTION +</button>
        </div>
        <br></br>
      </div>
    )
  }
}

export default QandA;