import React from 'react';

var QuantityDrop = ({ selectedQuantity, handleQuantityChange, isDisabled }) => (
  <div className='quantity'>
    <select value={selectedQuantity} onChange={handleQuantityChange} disabled={isDisabled ? true : false}>
      <option value='--'>--</option>
      <option value='1' >1</option>
      <option value='Option 2' >Option 2</option>
      <option value='Option 3' >Option 3</option>
    </select>


  </div>
)

export default QuantityDrop;