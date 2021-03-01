import React from 'react';

class RateReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      currentProduct: {}
    };
  }

  sliderfunc() {
    var slider = document.getElementById("size");
    var output = document.getElementById("demo");
    output.innerHTML = slider.value; // Display the default slider value

    // Update the current slider value (each time you drag the slider handle)
    slider.oninput = function () {
      output.innerHTML = this.value;
    }
  }


  render() {

    // Ratings & Reviews
    // Write a new Review
    // Review List
    // Sorting
    // Rating Breakdown
    // Product Breakdown
    // <i className="far fa-star"></i>  OPEN STAR
    // <i className="fas fa-star"></i>  CLOSED STAR
    // <i className="fas fa-star-half-alt"></i> HALF STAR


    return (

      <div id="ratingreviewcontainer" className="row">
        <div className="rrstats break-column">
          <div>
            <span className="average">3.5&nbsp;</span>
            <span className="avgstars">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star-half-alt"></i>
            </span>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <div>
            <span className="row">100% of reviews recommend this product</span>
            <br></br>
            <div className="row"><div className="bar-text">5 stars</div><div className="bar-container"><div className="bar-5"></div></div></div>
            <div className="row"><div className="bar-text">4 stars</div><div className="bar-container"><div className="bar-4"></div></div></div>
            <div className="row"><div className="bar-text">3 stars</div><div className="bar-container"><div className="bar-3"></div></div></div>
            <div className="row"><div className="bar-text">2 stars</div><div className="bar-container"><div className="bar-2"></div></div></div>
            <div className="row"><div className="bar-text">1 star</div><div className="bar-container"><div className="bar-1"></div></div></div>
          </div>
          <br></br>
          <br></br>
          <div>
            <div className="slidecontainer">
              <div className="sliderlabel">SIZE</div>
              <div>
                <input type="range" min="1" max="100" defaultValue="80" className="slider" id="size" />
                <div className="sliderrow">
                  <div className="sliderleft slidertext">Too Small</div>
                  <div className="slidercenter slidertext">Perfect</div>
                  <div className="sliderright slidertext">Too Big</div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="slidecontainer">
              <div className="sliderlabel">COMFORT</div>
              <div>
                <input type="range" min="1" max="100" defaultValue="20" className="slider" id="size" />
                <div className="sliderrow">
                  <div className="sliderleft slidertext">Poor</div>
                  <div className="slidercenter slidertext"></div>
                  <div className="sliderright slidertext">Perfect</div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="gap">

        </div>
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
      </div>

    );
  }
}

export default RateReviews;