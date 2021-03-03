import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


class AddOutfitCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }

  }


  render() {


    return(

      <div className="addOutfitCard">
        <div className="outfitBtnCont">
          <div className="outfitBtnTitle">ADD TO OUTFIT</div>
         <div id="outfitBtn">+</div>
        </div>
      </div>

    );
  }
}

export default AddOutfitCard;