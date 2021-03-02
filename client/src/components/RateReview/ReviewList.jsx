import React from 'react';
import reviews from '../../data/reviews'
import StarRatings from './StarRatings'

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     reviews:reviews,
     currentReview: reviews[0],
     isOpen: false,
     displayReviewItems: 2
    };
  }

  toggle() {
  this.setState({ isOpen: !this.state.isOpen });
  }

  getRenderedItems(string) {
    if (this.state.isOpen) {
      return string;
    }
    return string.substring(0,250);
  }

  render() {


    return (
      <div className="reviewlist">
        <h2>Total Reviews, Sorted By Placeholder</h2>
        <div><strong>248 reviews sorted by: relevance</strong></div>
        <br></br>



        <div id="reviewListTiles">
          <ul className="no-bullets">
            {this.state.reviews.map(review => (
              <li key={review.review_id} className="listrow">
                <span className="floatRight"> {review.reviewer_name},&nbsp; {review.date.substring(0, 10)}</span><StarRatings
                className="floatLeft listStars" rating={review.rating} />
                <br></br>
                <div><strong>{review.summary.substring(0,60 )}</strong></div>
                <div>
                  {this.getRenderedItems(review.body)}
                  <button onClick={this.toggle}>
                    {this.state.isOpen ? 'less' : 'more'}
                  </button>
                </div>









              </li>
            ))}</ul>
        </div>






        <div>
          <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>  December 25, 2019
              <p><strong>This is the first day of the rest of your life.</strong>  Today we are going to explore the meaning of life.  How can a wood chuck chuck if a wood chuck chucks wood.</p>
          <p>- Jodi Silverman</p>
          <br></br>
          <hr></hr>
        </div>

        <div>
          <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>  December 25, 2019
              <p><strong>This is the first day of the rest of your life.</strong>  Today we are going to explore the meaning of life.  How can a wood chuck chuck if a wood chuck chucks wood.</p>
          <p>- Jodi Silverman</p>
          <br></br>
          <hr></hr>
        </div>

        <div>
          <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>  December 25, 2019
              <p><strong>This is the first day of the rest of your life.</strong>  Today we are going to explore the meaning of life.  How can a wood chuck chuck if a wood chuck chucks wood.</p>
          <p>- Jodi Silverman</p>
          <br></br>
          <hr></hr>
        </div>

        <div>
          <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>  December 25, 2019
              <p><strong>This is the first day of the rest of your life.</strong>  Today we are going to explore the meaning of life.  How can a wood chuck chuck if a wood chuck chucks wood.</p>
          <p>- Jodi Silverman</p>
          <br></br>
          <hr></hr>
        </div>
      </div>



    );
  }
}

export default ReviewList;