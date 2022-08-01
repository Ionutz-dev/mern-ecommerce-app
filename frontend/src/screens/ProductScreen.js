import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';
import Rating from '../components/Rating';

import Loader from '../components/Loader';
import Message from '../components/Message';

import {
  fetchProductById,
  resetProductDetails,
} from '../store/product-details-slice';
import { addCartItem } from '../store/cart-slice';

const ProductScreen = props => {
  const [qty, setQty] = useState(1);

  let params = useParams();
  let navigate = useNavigate();
  const { id } = params;

  const dispatch = useDispatch();

  const product = useSelector(state => state.productDetails.productDetails);
  const loadingProduct = useSelector(state => state.productDetails.loading);
  const error = useSelector(state => state.productDetails.error);

  useEffect(() => {
    dispatch(fetchProductById(id));

    return () => {
      dispatch(resetProductDetails());
    };
  }, [dispatch, id]);

  const addToCartHandler = () => {
    dispatch(addCartItem({ product, qty, message: 'fromProductScreen' }));
    navigate(`/cart`);
  };

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go back
      </Link>
      {loadingProduct ? (
        <Loader />
      ) : error !== '' ? (
        <Message>Product couldn't load</Message>
      ) : (
        <Row>
          <Col md={5}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={4}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>Description {product.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price: </Col>
                    <Col>
                      <strong>{product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      <strong>
                        {product.countInStock >= 1
                          ? 'In Stock'
                          : 'Out Of Stock'}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Select
                          value={qty}
                          onChange={e => setQty(Number(e.target.value))}
                          style={{ padding: '0.7rem', minWidth: '3.5rem' }}
                        >
                          {[...Array(product.countInStock).keys()].map(x => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                    className='w-100'
                    disabled={product.countInStock === 0}
                    type='button'
                    onClick={addToCartHandler}
                  >
                    Add to cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
