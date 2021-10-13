import React from 'react';

import { Card } from 'react-bootstrap';
import Rating from './Rating';

const Product = props => {
  const { product } = props;

  return (
    <Card className='my-3 p-3 rounded'>
      <Card.Body>
        <a to={`/product/${product._id}`}>
          <Card.Img src={product.image} variant='top' />
        </a>

        <a to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </a>

        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as='h3'>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;