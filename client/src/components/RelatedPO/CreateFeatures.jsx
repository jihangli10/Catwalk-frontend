import React from 'react';
import ReactDOM from 'react-dom';

// pass in a prop called 'product' with a value of App.jsx's this.state.currentProduct
const CreateFeatures = (props) => {

  let eliminateDuplicateFeatures = () => {
    let noDuplicates = {};
    props.product.features.forEach(item => {
      noDuplicates[item.feature] = item.value;
    })
    return noDuplicates;
  }

  let allFeatures = eliminateDuplicateFeatures();

  let assembleFeature = (feature, value, key) => {
    let check = <img style={{height: '14px', width: '14px'}} src="https://img.icons8.com/metro/26/000000/checkmark.png"/>;
    let len = value ? value.length - 1 : null;
    let val = value ? value.slice(1, len) : check;
    return <div className="overviewFeatures" key={key}><span className="featureName">{feature} </span><span className="featureVal"> {val}</span></div>;
  }

  return (
    <div className="featuresContainer">
      {Object.keys(allFeatures).map((feature, key) => {
        return assembleFeature(feature, allFeatures[feature], key)
      })}
    </div>
  )
}


export default CreateFeatures;