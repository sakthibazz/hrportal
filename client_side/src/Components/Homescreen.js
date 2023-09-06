import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Adminacseeforhome from './Adminacseeforhome';
import Calander from './Calander';



const Homescreen = () => {
  return (
    <Container fluid className="p-0"> 
    <Row className='pt-5'>
      <Col xs={10} md={10} lg={10} className="pt-2">
     <Adminacseeforhome/>
      </Col>
     
      <Col xs={2} md={2} lg={2} className="pt-5" style={{marginTop:"48px"}}>
      <Calander/>
      </Col>
    </Row>
    <Row className='pt-5'>
      <Col xs={8} md={8} lg={8} className="pt-2">
      </Col>
    </Row>
  </Container>
  );
};

export default Homescreen;