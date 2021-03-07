import React from 'react';
import ReviewList from './ReviewList'
import AddNewReview from './AddNewReview';

class ReviewListSort extends React.Component {
  constructor(props) {
    super(props);
    this.reviewListElement = React.createRef();
    this.state = {
      sort: 'Relevant',
      reviews: [],
      displayed: 0,
      isOpen: false
    };
    this.sortByHelpful = this.sortByHelpful.bind(this)
    this.sortByRelative = this.sortByRelative.bind(this)
    this.sortByNewest = this.sortByNewest.bind(this)
    this.handleGetDisplayed = this.handleGetDisplayed.bind(this)
    this.handleAddReviewClick = this.handleAddReviewClick.bind(this)
  }

  sortByHelpful() {
    return this.props.reviewListSort.sort(function (a, b) {
      return -(a.helpfulness - b.helpfulness);
    })
  };

  sortByRelative() {
    // A little bit of Jihang enginnering magic, a little bit of Jodi coding magic //
    // get max Helpful
    let maxHelpful = Math.max.apply(Math, this.props.reviewListSort.map(function (o) { return o.helpfulness; }))
    // get max Date
    let maxDate = Math.max.apply(Math, this.props.reviewListSort.map(function (o) { return Math.round((new Date() - new Date(o.date)) / (1000 * 60 * 60 * 24)) }))
    // assign new array with sort key added to each review that has a value of helpful/maxHelpful + days/MaxDays
    let sortByRelative = this.props.reviewListSort.map(function (review) {
      var o = Object.assign({}, review);
      o.a_sort = (o.helpfulness / maxHelpful) + ((new Date(o.date) / (1000 * 60 * 60 * 24)) / maxDate)
      return o;
    })
    // return sorted sortByrelative
    return sortByRelative.sort(function (a, b) {
      return -(a.sort - b.sort);
    })

  };

  sortByNewest() {
    let sortByNewest = this.props.reviewListSort.map(function (el) {
      var o = Object.assign({}, el);
      o.a_sortDate = (new Date(o.date) / (1000 * 60 * 60 * 24))
      return o;
    })
    return sortByNewest.sort(function (a, b) {
      return -(a.a_sortDate - b.a_sortDate);
    })
  };

  onChange(e) {
    this.setState({ sort: event.target.value });
    if (event.target.value === 'Relevant') {
      this.setState({ reviews: this.sortByRelative() })
    } else if (event.target.value === 'Helpful') {
      this.setState({ reviews: this.sortByHelpful() })
    } else if (event.target.value === 'Newest') {
      this.setState({ reviews: this.sortByNewest() })
    }
  }

  handleClick() {
    this.reviewListElement.current.handleDisplay();
  }

  handleGetDisplayed(value) {
    this.setState({ displayed: value })
  }

  handleAddReviewClick() {
    this.setState({ isOpen: !this.state.isOpen });
  };

  componentDidMount() {
    if (this.props.reviewListSort.length <= 2) {
      this.setState({
        displayed: this.props.reviewListSort.length,
        reviews: this.props.reviewListSort,
        isOpen: false
      })
    } else {
      this.setState({
        displayed: 2,
        reviews: this.props.reviewListSort,
        isOpen: false
      })
    }
  }

  render() {
    var revListSortLength = this.props.reviewListSort.length
    if (this.props.reviewListSort.length === 0) {
      return '';
    }
    return (
      <div>

        <form><strong>{this.state.reviews.length} reviews sorted by:</strong>
          <select name='reviewSort' value={this.state.sort} onChange={this.onChange.bind(this)}>
            <option defaultValue>Relevant</option>
            <option>Helpful</option>
            <option>Newest</option>
          </select>
          <noscript><input type="submit" value="Submit" /></noscript>
        </form>

        <br></br>
        <ReviewList ref={this.reviewListElement}
          key={'reviews' + this.state.reviews.length}
          reviewList={this.state.reviews}
          onGetCurrentDisplay={this.handleGetDisplayed} />
        <br></br>
        <div id="question-button-row">
        <button style={{ display: revListSortLength >= this.state.displayed && revListSortLength > 2 ? "block" : "none" }} onClick={this.handleClick.bind(this)}>MORE REVIEWS</button>&nbsp;
        <button style={{ display: revListSortLength >= this.state.displayed && revListSortLength > 2 ? "block" : "none" }} onClick={this.handleAddReviewClick.bind(this)}>ADD REVIEWS</button>
          {this.state.isOpen ? (<AddNewReview handleAddReviewClick={this.handleAddReviewClick} addReviewProd={this.props.reviewProduct}/>) : null}
        </div>
        <br></br>
        <br></br>
      </div>
    )
  }
}

export default ReviewListSort;