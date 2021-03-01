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
    axios.get('/products', {params: {id, extras}})
      .then(related => {
        let relatedProds = related.data.map(product => {
          return axios.get('/products', {params: {id: product}});
        })
        Promise.all(relatedProds)
          .then(results => {
            let products = results.map(product => {
              return product.data;
            })
            this.setState({
              relatedProducts: products
            });
          })
      })
  }


  render() {

    if (!this.state.relatedProducts) {
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
    } else {
      console.log(this.state.relatedProducts);
      return(
      <div>
        <div className="relatedCont">
          <div className="relatedCarousel">
            {this.state.relatedProducts.map(product => {
              return <RelatedProdCard current={product}/>
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


