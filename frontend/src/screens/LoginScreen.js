import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import Meta from '../components/Meta';

import { loginUser } from '../store/user-slice';

const LoginScreen = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const userLogin = useSelector(state => state.userLogin);

  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? `/${location.search.split('=')[1]}` : '/';

  useEffect(() => {
    if (Object.keys(userInfo).length !== 0) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <>
      <Meta title='Login Page' />
      <FormContainer>
        <h1>Sign In</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading ? (
          <Loader />
        ) : (
          <>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required={true}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Enter password'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required={true}
                ></Form.Control>
              </Form.Group>

              <Button type='submit' variant='primary' className='mt-2'>
                Sign In
              </Button>
            </Form>

            <Row className='py-3'>
              <Col>
                New Customer?{' '}
                <Link
                  to={redirect ? `/register?redirect=${redirect}` : '/register'}
                >
                  Register
                </Link>
              </Col>
            </Row>
          </>
        )}
      </FormContainer>
    </>
  );
};

export default LoginScreen;
