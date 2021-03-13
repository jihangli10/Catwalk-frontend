import React from 'react';
import axios from 'axios';

class RatingHelpful extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpfulness: 0,
      helpClicked: false,
      reported: false
    };
  }

  componentDidMount() {
    this.setState({
      helpfulness: this.props.helpfulness
    })
  }

  handleReviewHelpfulClick(e) {
    e.preventDefault();
    return axios.put(`/reviews/${this.props.reviewID}/helpful`, { params: { review_id: this.props.reviewID } })
      .then(() => {
        this.setState({
          helpfulness: this.state.helpfulness + 1,
          helpClicked: true
        });
      })
      .catch(err => {
        console.log('failed to update helpfulness');
      })
  }

  handleReviewReport(e) {
    e.preventDefault();
    return axios.put(`/reviews/${this.props.reviewID}/report`, { params: { review_id: this.props.reviewID } })
      .then(() => {
        this.setState({
          reported: true
        });
      })
      .catch(err => {
        console.log('failed to report');
      })
  }
  /*Rating Helpfulness - Any user on the site will have the ability to provide feedback on whether reviews are helpful. At the bottom of the review tile the text “Was this review helpful?” will precede two links “Yes (#)” and “No (#)”. Following “Yes” and “No” will be the count of users that have selected that button. Clicking either link should cast a vote for that selection.

A user on the site does not need to be logged in to provide feedback on helpfulness.

A user can provide feedback on any review. However, they can only make one submission for each review. If the user selects either “Yes” or “No” for a review, they should not be able to select another option again for that review.

*/

  render() {


    return (
      <div className="row">

        <span>&nbsp;Was this review helpful?&nbsp;
          {this.state.helpClicked ?
            <span className="yes-help-clicked">Yes&nbsp;</span> :
            <a onClick={this.handleReviewHelpfulClick.bind(this)} href="#">Yes</a>}
          <strong>&nbsp;{this.state.helpfulness}</strong></span>&nbsp;|&nbsp;

        <span>
          {this.state.reported ?
            <span className="report-clicked">Reported&nbsp;</span> :
            <a onClick={this.handleReviewReport.bind(this)} href="#">Report</a>}
        </span>

     </div>
    );
  }
}

export default RatingHelpful;