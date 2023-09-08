import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Adminacseeforhome from './Adminacseeforhome';




const Homescreen = () => {
  return (
    <Container fluid className="p-0"> 
    <Row className='pt-5'>
      <Col xs={10} md={10} lg={10} className="pt-2">
     <Adminacseeforhome/>
      </Col>
    </Row>
  </Container>
  );
};

export default Homescreen;