import React from 'react';

var SizeDrop = ({ selectedSize, handleSizeChange, currentSizeQuantityList }) => (
  <div className='sizeDropContainer'>
    <select className='sizeDropDown' value={selectedSize} onChange={handleSizeChange}>
      <option className='defaultSizeOption' key='0' id='0' value='Select Size'>SELECT SIZE</option>
      {Object.entries(currentSizeQuantityList).map(element =>

        <option key={element[0]} id={element[0]} value= {element[1].size}>{element[1].size}</option>
      )}
    </select>


  </div>
)

export default SizeDrop;