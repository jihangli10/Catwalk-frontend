import React from 'react';

var SizeDrop = ({selectedSize, handleSizeChange}) => (
  <div className='size'>
    <select value={selectedSize} onChange={handleSizeChange}>
      <option value='Select Size'>Select Size</option>
      <option value='Option 1'>Option 1</option>
      <option value='Option 2'>Option 2</option>
      <option value='Option 3'>Option 3</option>
    </select>


  </div>
)

export default SizeDrop;