import React from 'react';

var QuantityDrop = ({ selectedQuantity, handleQuantityChange, isDisabled, currentQuantity }) => (
  <div className='quantityDropContainer'>
    <select className='quantityDropDown' value={selectedQuantity} onChange={handleQuantityChange} disabled={isDisabled ? true : false}>
      <option className='defaultQuantityOption' value='--'>--</option>
      {currentQuantity.map(element =>
        <option key={element} value={element}>{element}</option>
      )}
    </select>


  </div>
)

export default QuantityDrop;