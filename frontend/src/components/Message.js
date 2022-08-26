import React from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({ variant, children }) => {
  return (
    <Alert
      variant={variant}
      className='text-center'
      style={{ fontSize: '1.7rem' }}
    >
      {children}
    </Alert>
  );
};

Message.defaultProps = {
  variant: 'light',
};

export default Message;
