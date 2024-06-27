import React from 'react';
import './ProductItem.css';
import Button from '../Button/Button';

function ProductItem({product, className, onAdd }) {
  const onAddHandler = () => {
    onAdd(product)
  }

  return (
    <div className={'product' + className}>
      <div className={'img'}></div>
      <div className={'title'}>{product.title}</div>
      <div className={'description'}>{product.description}</div>
      <div className={'price'}>
        <span>Стоимость: <b>{product.price}</b></span>
      </div>
      <Button onClick={onAddHandler} className={'add-btn'} >
        Добавить в Карзину
      </Button>
    </div>
  )
}

export default ProductItem