import React from 'react';

var SizeDrop = ({ selectedSize, handleSizeChange, currentSizeQuantityList }) => (
  <div className='size'>
    <select value={selectedSize} onChange={handleSizeChange}>
      <option key='0' id='0' value='Select Size'>Select Size</option>
      {Object.entries(currentSizeQuantityList).map(element =>
        <option key={element[0]} id={element[0]} value= {element[1].size}>{element[1].size}</option>
      )}
    </select>


  </div>
)

export default SizeDrop;