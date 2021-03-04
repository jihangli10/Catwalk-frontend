import React from 'react';
import ReviewList from './ReviewList'

class ReviewListSort extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: 'Relevant',
      reviews: []
    };
    this.sortByHelpful=this.sortByHelpful.bind(this)
  }


  //if (this.state.sort === 'Helpful') {

  sortByHelpful() {
   return this.props.reviewListSort.sort(function (a, b) {
      return a.helpfulness - b.helpfulness;
    })
  };

  sortByRelative() {

    // get max Helpful
    // divide helpful# by max Helpful to get relative between 0-1
    // get oldest days to now
    // divide days to now by max oldest days to get relative between 0-1
    // sum divided Helpful and divided oldest to get new criteria
  }

  onChange(e) {
    this.setState({sort: event.target.value});
  }


  render() {
    if (this.props.reviewListSort.length === 0) {
      return '';
    }
    return (
      <div>
        <form><strong>248 reviews sorted by:</strong>
          <select name='reviewSort' value={this.state.sort} onChange={this.onChange.bind(this)}>
            <option defaultValue>Relevant</option>
            <option>Helpful</option>
            <option>Newest</option>
          </select>
          <noscript><input type="submit" value="Submit" /></noscript>
        </form>
        <br></br>
        <div className="reviewlist">
          <ReviewList key={'reviews' + this.state.reviews.length}
            reviewList={this.props.reviewListSort} />
        </div>
      </div>
    );
  }
}

export default ReviewListSort;