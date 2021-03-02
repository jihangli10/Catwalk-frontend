import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../../data.js';
import axios from 'axios';




class RelatedProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasLoaded: false,
      currentStyle: styles
    }
    this.getCurrentStyles = this.getCurrentStyles.bind(this);
    this.updateParentProduct = this.updateParentProduct.bind(this);
  }

  componentDidMount() {
    this.getCurrentStyles();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.current.data.id !== this.props.current.data.id) {
      console.log(this.props.current.data.id);
      console.log(prevProps.current.data.id);
      this.getCurrentStyles();
    }

  }


  getCurrentStyles() {
    let id = this.props.current.data.id;
    let extras = 'styles';
    // console.log(id);
    axios.get('/products', {params: {id, extras}})
      .then(newStyles => {
        this.setState({
          currentStyle: newStyles.data
        });
      })
  }

  updateParentProduct() {
    // console.log('ID:', this.props.current.data.id);
    this.props.update(this.props.current.data.id)
      .then(() => {
        this.props.getRelated()
          .then(() => console.log('cool'));
      });
  }

  render() {
    let styleImage = this.state.currentStyle.results[0].photos[0].url;
    let stylePrice =  this.state.currentStyle.results[0].original_price;
    let id = this.props.current.data.id;
    // console.log(styleImage);
    // console.log(this.props.current.data.name);
    // console.log(id);


    return(
      <div  onClick={this.updateParentProduct}className="relatedCard">
        <div className="relImageCont">
        <img id="relActionBtn" height="18" src="https://img.icons8.com/fluent-systems-regular/24/ffffff/star--v1.png"/>
            <img className="relProdImage" src={styleImage} />
        </div>
        <div className="relProdCategory">{this.props.current.data.category.toUpperCase()}</div>
        <div className="relProdName">{this.props.current.data.name}</div>
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