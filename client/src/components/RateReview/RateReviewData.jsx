import React from 'react';
import axios from 'axios';
import RateReview from './RateReview';
import AddNewReview from './AddNewReview';
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
      sort: '',
      numberDisplayed: 0,
      isOpen: false
    }
    this.onToggle = this.onToggle.bind(this)
    this.onClearAll = this.onClearAll.bind(this)
    this.sortByHelpful = this.sortByHelpful.bind(this)
    this.sortByRelative = this.sortByRelative.bind(this)
    this.sortByNewest = this.sortByNewest.bind(this)
    this.onChange=this.onChange.bind(this)
    this.onClickAddMore=this.onClickAddMore.bind(this)
    this.onAddReviewClick = this.onAddReviewClick.bind(this)
  }
  // SET INITIAL STATE ==================================================================== //
  componentDidMount() {
    return axios.get('/reviews', { params: { product_id: this.props.currProd.id, count: 1000 } })
      .then(data => {
        if (data.data.results.length <= 2) {
          var tempNumDisplayed = data.data.results.length;
        } else {
          var tempNumDisplayed = 2;
        }
        this.setState({
          reviews: data.data.results,
          displayReviews: data.data.results.slice(0, tempNumDisplayed),
          sort: 'Relative',
          numberDisplayed: tempNumDisplayed })
      })
      .catch(err => { console.log(err); });
  }
  // FILTER DATA ========================================================================== //
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
    this.setState({ filter: tempArray, displayReviews: tempReview.slice(0, this.state.numberDisplayed) }, () => {
      })
  }
  onClearAll() {
    this.setState({ filter: [], displayReviews: this.state.reviews.slice(0, this.state.numberDisplayed) })
  }
  // SORT DATA ========================================================================== //
  sortByHelpful() {
    return this.state.displayReviews.sort(function (a, b) {
      return -(a.helpfulness - b.helpfulness);
    })
  };
  sortByRelative() {
    let maxHelpful = Math.max.apply(Math, this.state.displayReviews.map(function (o) {
      return o.helpfulness;
    }))
    let maxDate = Math.max.apply(Math, this.state.displayReviews.map(function (o) {
      return Math.round((new Date() - new Date(o.date)) / (1000 * 60 * 60 * 24))
    }))
    let sortByRelative = this.state.displayReviews.map(function (review) {
      var o = Object.assign({}, review);
      o.a_sort = (o.helpfulness / maxHelpful) + ((new Date(o.date) / (1000 * 60 * 60 * 24)) / maxDate)
      return o;
    })
    return sortByRelative.sort(function (a, b) {
      return -(a.sort - b.sort);
    })
  };
  sortByNewest() {
    let sortByNewest = this.state.displayReviews.map(function (el) {
      var o = Object.assign({}, el);
      o.a_sortDate = (new Date(o.date) / (1000 * 60 * 60 * 24))
      return o;
    })
    return sortByNewest.sort(function (a, b) {
      return -(a.a_sortDate - b.a_sortDate);
    })
  };
  onChange(event) {
    this.setState({ sort: event.target.value });
    if (event.target.value === 'Relevant') {
      this.setState({ displayReviews: this.sortByRelative() })
    } else if (event.target.value === 'Helpful') {
      this.setState({ displayReviews: this.sortByHelpful() })
    } else if (event.target.value === 'Newest') {
      this.setState({ displayReviews: this.sortByNewest() })
    }
  }
  onClickAddMore() {
      this.setState({
        numberDisplayed: this.state.numberDisplayed + 2,
        displayReviews: this.state.reviews.slice(0, this.state.numberDisplayed + 2)
        })
  }
  onAddReviewClick() {
    this.setState({ isOpen: !this.state.isOpen });
  };
// SORT DATA ========================================================================== //
  render() {
    return (
      <div>

          <RateReview
            onToggle={this.onToggle.bind(this)}
            onClearAll={this.onClearAll.bind(this)}
            sortByHelpful={this.sortByHelpful.bind(this)}
            sortByRelative={this.sortByRelative.bind(this)}
            sortByNewest={this.sortByNewest.bind(this)}
            onChange={this.onChange.bind(this)}
            onClickAddMore={this.onClickAddMore.bind(this)}
            onAddReviewClick={this.onAddReviewClick}
            reviews={this.state.reviews}
            filter={this.state.filter}
            displayReviews={this.state.displayReviews}
            sort={this.state.sort}
            numberDisplayed={this.state.numberDisplayed}
            isOpen={this.state.isOpen}
            metaData={this.props.metaData}
            currProd={this.props.currProd}
          />
      </div>
    );
  }
}
export default RateReviewData;