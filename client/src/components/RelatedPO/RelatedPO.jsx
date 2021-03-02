import React from 'react';
import ReactDOM from 'react-dom';
import YourOutfitCard from './YourOutfitCard.jsx';
import RelatedProdCard from './RelatedProdCard.jsx';
import axios from 'axios';



class RelatedPO extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedProducts: null
    }
    this.getRelatedProducts = this.getRelatedProducts.bind(this);
  }
  componentDidMount() {
    this.getRelatedProducts();
  }


  getRelatedProducts() {
    let id = this.props.currProd.id;
    let extras = 'related';
    return axios.get('/products', {params: {id, extras}})
      .then(related => {
        let relatedProds = related.data.map(product => {
          return axios.get('/products', {params: {id: product}});
        })
        Promise.all(relatedProds)
          .then(results => {
            this.setState({
              relatedProducts: results
            });
          })
          .catch(error => console.log('ERROR with Promise.all', error));
      })
      .catch(error => console.log('ERROR retrieving data', error));
  }


  render() {

    if (!this.state.relatedProducts) {
      return(
        <div></div>
      );
    } else {
      return(
      <div>
        <div className="relatedCont">
          <div className="relatedCarousel">
            {this.state.relatedProducts.map((product, i) => {
              return <RelatedProdCard getRelated={this.getRelatedProducts} update={this.props.updateProd} key={i} current={product}/>
            })}
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
}


export default RelatedPO;


