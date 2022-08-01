import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';

import { fetchProducts } from '../store/products-list-slice';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.productsList.productsList);
  const loadingProducts = useSelector(state => state.productsList.loading);
  const error = useSelector(state => state.productsList.error);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <h1>Latest products</h1>
      {loadingProducts ? (
        <Loader />
      ) : error !== '' ? (
        <Message variant='light'>Products couldn't load</Message>
      ) : (
        <>
          <Row>
            {products.map(product => {
              return (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              );
            })}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
