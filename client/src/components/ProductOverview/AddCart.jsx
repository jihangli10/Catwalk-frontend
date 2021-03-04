import React from 'react'

var AddCart = ({ handleAddCart, inStock, isCartMade }) => (
  <div className='cartItem'>
    {inStock ? <button className='someButton' onClick={handleAddCart}>Add to Cart</button> : <div>Out of Stock</div>}
    {isCartMade ? <button className='cartButton'></button> : null}
  </div>
)



export default AddCart