import React from 'react';

class ReviewList extends React.Component {
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

    /*

1.2.2.1 Star Rating
1.2.2.2 Date of Review
1.2.2.3 Review Summary
1.2.2.4 Review Body
1.2.2.5 Recommend
1.2.2.6 Reviewer Name
1.2.2.7 Response to Review
1.2.2.8 Rating Helpfulness
*/


    return (



    );
  }
}

export default ReviewList;