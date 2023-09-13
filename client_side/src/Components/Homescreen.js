import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Adminacseeforhome from './Adminacseeforhome';
import Adminagetdetails from './Adminagetdetails';
import useFetch from '../hooks/Fetch.hook.js';




const Homescreen = () => {
  const [userPosition, setUserPosition] = useState('');
  const [{ isLoading, apiData }] = useFetch();

  useEffect(() => {
    if (!isLoading && apiData) {
      setUserPosition(apiData.position);
    }
  }, [isLoading, apiData]);

 
  return (
    <Container fluid className="p-0"> 
    <Row className='pt-5'>
      <Col xs={10} md={10} lg={10} className="pt-2">
        {userPosition === 'recruiter' ? (
          <Adminacseeforhome />
        ) : userPosition === 'admin' ? (
          <>
            <Adminagetdetails />    
          </>
        ) : null}
      </Col>
    </Row>
  </Container>
  )
};

export default Homescreen;