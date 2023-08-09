import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import ImageSlider from './ImageSlide';
import Calendars  from './Calander';

const Homescreen = () => {
  return (
    <Container fluid className="p-0"> 
    <Row>
      <Col>
        
      </Col>
    </Row>
    <Row className='pt-5'>
      <Col>
       
      </Col>
      <Col xs={8} md={6} lg={4} className="pt-2">
        <div style={{ paddingLeft: '20px' }}>
        <ImageSlider />
        </div>
      </Col>
      <Col xs={12} md={4} lg={3} className="mt-2">
        {/* Your component */}
      </Col>
      <Col xs={12} md={12} lg={3} className="mt-2">
        <Calendars />
      </Col>
    </Row>
  </Container>
  );
};

export default Homescreen;