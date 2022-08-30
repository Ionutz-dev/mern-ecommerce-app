import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const FormContainer = ({ height = 70, children }) => {
  return (
    <Container>
      <Row
        className='align-items-center justify-content-center'
        style={{ minHeight: `${height}vh` }}
      >
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
