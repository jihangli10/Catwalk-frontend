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
      displayReviews: [],
      metaData: []
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
        let reviews = data.data.results;
        let displayReview = data.data.results;
        return axios.get('/reviews/meta', { params: { product_id: this.props.currProd.id } })
          .then(data => {
            var metaDataTemp = [];
            this.setState({
              reviews: reviews,
              displayReviews: displayReview,
              metaData: data.data.characteristics
            })
          })
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
    var tempArray = this.state.filter;
    if (this.state.filter.includes(num)) {
      tempArray.splice(this.state.filter.indexOf(num), 1);
    } else {
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
    this.setState({ filter: [], displayReviews: this.state.reviews})
  }

  render() {
    return (
      <div>
        <RateReview
          key={'reviews' + this.state.reviews.length + this.state.metaData.length}
          rateReviews={this.state.displayReviews}
          reviews={this.state.reviews}
          filter={this.state.filter}
          onToggleClick={this.onToggle}
          onClearAllClick={this.onClearAll}
          metaData={this.state.metaData}
          reviewProd={this.props.currProd}
        />
      </div>
    );
  }
}

export default RateReviewData;