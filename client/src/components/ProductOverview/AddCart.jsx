import React from 'react'

var AddCart = ({ handleAddCart, inStock }) => (
  <div>
    {inStock ? <button className='someButton' onClick={handleAddCart}>Add to Cart</button> : <div>Out of Stock</div>}
  </div>
)



export default AddCart