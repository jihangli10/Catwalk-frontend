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


    return(

      <div className="outfitCard">
          <div className="outImageCont">
              <div id="outActionBtn" >
                <img name="outAction" height="20" src="https://img.icons8.com/windows/32/000000/macos-close.png"/>
              </div>
              <img className="relProdImage"/>
          </div>
          <div className="relProdCategory"></div>
          <div className="relProdName"></div>
          <div className="relProdPrice"><span ></span> </div>
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