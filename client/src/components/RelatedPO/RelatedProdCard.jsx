import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../../data/data.js';
import axios from 'axios';


class RelatedProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStyle: null,
      reviews: null
    }
    this.getCurrentStyles = this.getCurrentStyles.bind(this);
    this.updateParentProduct = this.updateParentProduct.bind(this);
    this.getReviewMeta = this.getReviewMeta.bind(this);
  }

  componentDidMount() {
    this.getCurrentStyles(this.props.current.data.id);
    this.getReviewMeta(this.props.current.data.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.current.data.id !== this.props.current.data.id) {
      this.getCurrentStyles(this.props.current.data.id);
      this.getReviewMeta(this.props.current.data.id);
    }
  }

  getCurrentStyles(id) {
    let extras = 'styles';
    axios.get(`/products/${id}/${extras}`)
      .then(newStyles => {
        this.setState({
          currentStyle: newStyles.data
        });
      })
      .catch((error) => console.log('ERROR getting styles: ', error));
  }

  updateParentProduct(e) {
    if (e.target.name !== 'star') {
      this.props.update(this.props.current.data.id)
      .then(() => {
        this.props.getRelated()
          .then(() => this.props.getStyles(this.props.parentProduct.id))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
    }
  }

  getReviewMeta(id) {
    axios.get('/reviews/meta', {params: {product_id: id}})
      .then((results) => {
        this.setState({
          reviews: results.data
        })
      })
  }

  render() {
    if (!this.state.currentStyle) {
      return (
        <div>loading...</div>
      )
    } else {
      let defaultStyle = this.state.currentStyle.results[0];
      let styleImage = defaultStyle.photos[0].url;
      let stylePrice = defaultStyle.sale_price ? defaultStyle.sale_price : defaultStyle.original_price;
     let id = this.props.current.data.id;

      return(

        <div onClick={this.updateParentProduct} className="relatedCard">
          <div className="relImageCont">
              <div id="relActionBtn" >
                <img name="star" height="18" onClick={() => this.props.handleActionClick(this.props.current.data, this.state.currentStyle, this.state.reviews)} src="https://img.icons8.com/fluent-systems-regular/24/ffffff/star--v1.png"/>
              </div>
              <img className="relProdImage" src={styleImage} />
          </div>
          <div className="relProdCategory">{this.props.current.data.category.toUpperCase()}</div>
          <div className="relProdName">{this.props.current.data.name} </div>
          <div className="relProdPrice">${stylePrice} <span className={defaultStyle.sale_price ? "sale" : "noSale"}>${defaultStyle.original_price}</span> </div>
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
}

export default RelatedProductCard;