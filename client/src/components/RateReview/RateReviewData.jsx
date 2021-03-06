import React from 'react';
import axios from 'axios';
import RateReview from './RateReview';
// 19091 HAS NO REVIEWS
// 19093 HAS 2 REVIEWS
// 19191 HAS 5 REVIEWS
// 19090 HAS A RESPONSE
// 19100 HAS 1 RESPONSE

class RateReviewData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      filter: [],
      displayReviews: []
      // reviewFilter - array of selected stars
      // filter reviews if reviewFilter includes individual review rating
    }
    this.onToggle = this.onToggle.bind(this)
    this.updateStateByFilter = this.updateStateByFilter.bind(this)
    this.onClearAll = this.onClearAll.bind(this)
  }
  componentDidMount() {
    return axios.get('/reviews', { params: { product_id: this.props.currProd.id } })
      .then(data => {
        this.setState({ reviews: data.data.results, displayReviews: data.data.results })
      })
      .catch(err => { console.log(err); });
  }

  updateStateByFilter() {
    if (this.state.filter.length === 0) {
     this.setState({displayReviews: this.state.reviews})
    } else {
      this.setState({ displayReviews: this.state.reviews.filter(item => this.state.filter.includes(item.rating))})
    }
  }

  onToggle(num) {
    console.log('clicked')
    var tempArray = this.state.filter;
    if (this.state.filter.includes(num)) {
      tempArray.splice(this.state.filter.indexOf(num), 1);
    } else {
      console.log('Here I am to save the day!!!')
      tempArray = tempArray.concat(num);
    }
    if (tempArray.length === 0) {
      var tempReview = this.state.reviews;
    } else {
      var tempReview = this.state.reviews.filter(item => tempArray.includes(item.rating));
    }
    this.setState({ filter: tempArray, displayReviews: tempReview })
  }
  onClearAll() {
    console.log('clicked')
    this.setState({ filter: [], displayReviews: this.state.reviews})
  }

  render() {
    console.log('this.state.displayReviews', this.state.displayReviews)
    return (
      <div>
        <RateReview
          key={'reviews' + this.state.reviews.length}
          rateReviews={this.state.displayReviews}
          reviews={this.state.reviews}
          filter={this.state.filter}
          onToggleClick={this.onToggle}
          onClearAllClick={this.onClearAll}
        />
        {console.log('this.state.reviews', this.state.reviews, 'this.state.currentReview', this.state.currentReview)}
        {console.log('filtered >>>', this.state.reviews.filter(item => this.state.filter.includes(item.rating)))}
      </div>
    );
  }
}

export default RateReviewData;