import React from 'react';
import ReactDOM from 'react-dom';
import YourOutfitCard from './YourOutfitCard.jsx';
import RelatedProdCard from './RelatedProdCard.jsx';


class RelatedPO extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }


  render() {
    return(
    <div>
      <div className="relatedCont">
        <div className="relatedCarousel">
          <RelatedProdCard current={this.props.currProd}/>
        </div>
      </div>
      <div className="outfitCont">
        <div className="outfitCarousel">
          <YourOutfitCard />
        </div>
      </div>
    </div>

    );
  }
}


export default RelatedPO;


