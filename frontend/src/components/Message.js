import React from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({ variant, children }) => {
  return (
    <div
      className='d-flex justify-content-center align-items-center'
      style={{ height: '70vh' }}
    >
      <Alert
        variant={variant}
        className='text-center'
        style={{ fontSize: '1.7rem' }}
      >
        {children}
      </Alert>
    </div>
  );
};

Message.defaultProps = {
  variant: 'light',
};

export default Message;
