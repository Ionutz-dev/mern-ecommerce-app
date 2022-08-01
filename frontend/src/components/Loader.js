import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <div
      className='d-flex justify-content-center align-items-center'
      style={{ height: '70vh' }}
    >
      <Spinner
        as='h3'
        animation='border'
        style={{ width: '4rem', height: '4rem' }}
      />
    </div>
  );
};

export default Loader;
