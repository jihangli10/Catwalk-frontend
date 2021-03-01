import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../../data.js';




class RelatedProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStyle: styles
    }
  }

  render() {
    let styleImage = this.state.currentStyle.results[0].photos[0].thumbnail_url;
    let stylePrice =  this.state.currentStyle.results[0].original_price;
    return(
      <div className="relatedCard">
        <div className="relImageCont">
        <img id="relActionBtn" height="18" src="https://img.icons8.com/fluent-systems-regular/24/ffffff/star--v1.png"/>
            <img className="relProdImage" src={styleImage} />
        </div>
        <div className="relProdCategory">{this.props.current.category.toUpperCase()}</div>
        <div className="relProdName">{this.props.current.name}</div>
        <div className="relProdPrice">${stylePrice}</div>
          <div className="relProdReviews">
            <span className="avgstars">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
            </span>
          </div>
      </div>

    );
  }
}

export default RelatedProductCard;