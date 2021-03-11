import React from 'react'

var AddCart = ({ handleAddCart, inStock, isCartMade }) => (
  <div className='cartItem'>
    {inStock ? <button className='someCartButton' onClick={handleAddCart}>Add to Cart</button> : <div>Out of Stock</div>}
    {isCartMade ? <button className='cartButtonIcon'></button> : null}
  </div>
)



export default AddCart