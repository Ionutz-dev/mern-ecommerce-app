import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const SearchBox = () => {
  const [query, setQuery] = useState('');

  const navigate = useNavigate();

  const submitHandler = e => {
    e.preventDefault();

    navigate(query ? `/search/${query}` : '/search');
  };

  return (
    <Form onSubmit={submitHandler} className='d-flex search-box'>
      <Form.Control
        type='text'
        onChange={e => setQuery(e.target.value)}
        placeholder='Search Products'
        className='mr-sm-2 ml-sm-4 w-60 rounded-end rounded-pill'
      ></Form.Control>
      <Button
        type='button'
        variant='outline-light'
        className='p-2 br-25 ml-0 rounded-start rounded-pill'
      >
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
