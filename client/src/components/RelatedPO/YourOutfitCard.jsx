import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import AddOutfitCard from './AddOutfitCard.jsx';


class YourOutfitCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }

  }


  render() {

    let newArticle = this.props.outfit;
    let price = newArticle.sale_price ? newArticle.sale_price : newArticle.original_price;

    return(

      <div className="outfitCard">
          <div className="outImageCont">
              <div id="outActionBtn" >
                <img onClick={() => this.props.remove(newArticle.id)} name="outAction" height="20" src="https://img.icons8.com/windows/32/ffffff/macos-close.png"/>
              </div>
              <img className="relProdImage" src={newArticle.image}/>
          </div>
          <div className="relProdCategory">{newArticle.category}</div>
          <div className="relProdName">{newArticle.name}</div>
          <div className="relProdPrice">${price}<span className={newArticle.sale_price ? "sale" : "noSale"}>${newArticle.original_price}</span> </div>
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

export default YourOutfitCard;