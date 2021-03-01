import React from 'react';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     reviews:[]
    };
  }

  render() {


    return (
      <div className="reviewlist">
        <h2>Total Reviews, Sorted By Placeholder</h2>
        <div><strong>248 reviews sorted by: relevance</strong></div>
        <br></br>
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