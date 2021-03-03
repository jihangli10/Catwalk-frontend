import React from 'react';

class ReviewsSliders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    reviews: []
    }
  }

  sliderfunc() {
    var slider = document.getElementById("size");
    var output = document.getElementById("demo");
    output.innerHTML = slider.value; // Display the default slider value
    // test for change
    // Update the current slider value (each time you drag the slider handle)
    slider.oninput = function () {
      output.innerHTML = this.value;
    }
  }


  render() {

    return (

        <div>
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
    );
  }
}

export default ReviewsSliders;