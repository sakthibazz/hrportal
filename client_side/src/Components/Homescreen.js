import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Adminacseeforhome from './Adminacseeforhome';
import Searchhome from './Searchhome';



const Homescreen = () => {
  return (
    <Container fluid className="p-0"> 
    <Row className='pt-5'>
      <Col xs={8} md={8} lg={8} className="pt-2">
     <Adminacseeforhome/>
      </Col>
    </Row>
    <Row className='pt-5'>
      <Col xs={8} md={8} lg={8} className="pt-2">
     <Searchhome/>
      </Col>
    </Row>
  </Container>
  );
};

export default Homescreen;