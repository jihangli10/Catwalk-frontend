import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


class YourOutfitCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }

  }


  render() {


    return(

      <div className="outfitCard">
        <div className="outfitBtnCont">
         <button id="outitBtn">+</button>
        </div>
      </div>

    );
  }
}

export default YourOutfitCard;