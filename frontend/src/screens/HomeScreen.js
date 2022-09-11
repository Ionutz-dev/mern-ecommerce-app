import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';

import { listProducts } from '../store/product-slice';

const HomeScreen = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const keyword = params.keyword;
  const pageNumber = params.pageNumber || 1;

  const productsList = useSelector(state => state.productsList);
  const {
    loading: loadingProducts,
    error,
    productsList: products,
    page,
    pages,
  } = productsList;

  useEffect(() => {
    dispatch(listProducts({ keyword, pageNumber }));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta title='Welcome to PremiumShop | Home' />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <h1>Latest products</h1>
      {loadingProducts ? (
        <Loader />
      ) : error !== '' ? (
        <div className='min-60vh d-flex justify-content-center align-items-center'>
          <Message variant='light'>Products couldn't load</Message>
        </div>
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
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
