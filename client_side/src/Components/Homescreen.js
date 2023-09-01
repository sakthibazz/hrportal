import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Adminacseeforhome from './Adminacseeforhome';
import Searchhome from './Searchhome';
import Calander from './Calander';
import ImageSlider from './ImageSlide'



const Homescreen = () => {
  return (
    <Container fluid className="p-0"> 
    <Row className='pt-5'>
      <Col xs={5} md={5} lg={5} className="pt-2">
     <Adminacseeforhome/>
      </Col>
      <Col xs={5} md={5} lg={5} className="pt-5 px-5" style={{marginTop:"48px"}}>
    <ImageSlider/>
      </Col>
      <Col xs={2} md={2} lg={2} className="pt-5" style={{marginTop:"48px"}}>
      <Calander/>
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