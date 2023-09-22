import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import Adminacseeforhome from './Adminacseeforhome';
import Adminagetdetails from './Adminagetdetails';
import Analiseuserwork from './Analiseuserwork';
const Homescreen = () => {
 const [isLoading, setIsLoading] = useState(true);
 const [apiData, setApiData] = useState(null);

 const fetchData = useCallback(async () => {
   const data = await fetchData();
   setApiData(data);
   setIsLoading(false);
 }, []);

 useEffect(() => {
   fetchData();
 }, [fetchData]);

 const userPosition = useMemo(() => {
   return apiData?.position || '';
 }, [apiData]);

 if (isLoading) {
   return (
     <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
       <Spinner animation="border" role="status">
         <span className="visually-hidden">Loading...</span>
       </Spinner>
     </div>
   );
 }

 return (
   <Container fluid className="p-0">
     <Row className='pt-5'>
       <Col xs={10} md={10} lg={10} className="pt-2">
         {userPosition === 'recruiter' ? (
           <Adminacseeforhome />
         ) : userPosition === 'admin' ? (
           <>
             <Adminagetdetails />
             <Analiseuserwork />
           </>
         ) : null}
       </Col>
     </Row>
   </Container>
 );
};

export default Homescreen;