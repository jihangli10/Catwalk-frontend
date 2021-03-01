import React from 'react';
import ReactDOM from 'react-dom';
// import styles from '.../data.js';




class RelatedProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: styles
    }
  }

  render() {
    return(
      <div className="relatedCard">
        <div className="relActionBtn">
          <div className="relStarIcon">
             <img height="15" src="https://img.icons8.com/ios/24/000000/star--v1.png"/>
          </div>
        </div>
        <div>

        </div>
      </div>

    );
  }
}

export default RelatedProductCard;