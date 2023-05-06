import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const FormComponent = ({ children }) => {
  return (
    <Container style={{ marginTop: 50 }}>
      <Row className="justify-content-md-center align-item-center">
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormComponent;
