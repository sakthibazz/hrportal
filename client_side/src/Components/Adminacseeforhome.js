import React, { useState, useEffect } from "react";
import { Table, Container, Row, Col, Button } from "react-bootstrap";
import { getAdminPostbyStatus } from "../helper/Helper";
import { Link } from "react-router-dom";
import Loader from './Loader';
import './FontText.css';

const Adminacseeforhome = () => {
  const [latestAdminPosts, setLatestAdminPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLatestAdminPosts(); 
  }, []);

  const fetchLatestAdminPosts = async () => {
    try {
      const response = await getAdminPostbyStatus();
      const sortedResponse = response.sort((a, b) => b.Ticket_no - a.Ticket_no);
      const latestFivePosts = sortedResponse.slice(0, 5); // Get the latest 5 records
      setLatestAdminPosts(latestFivePosts);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching latest admin posts:", error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container fluid>
      <Row className="mt-2">
        <Col md={12} style={{ marginLeft: '30px' }}>  
          {latestAdminPosts.length > 0 ? (
          <Row className="mt-2">
            <Col md={12} style={{ marginLeft: '30px' }}>
            <h3 className="header-title">Current Client Requirements</h3>
            <Table className="custom-font" style={{ width: '100%', border: 'none' }} striped hover>
                <thead>
                <tr>
                  <th>Date</th>                
                    <th>Req.No</th>
                    <th>Client</th>
                    <th>Job Title</th>
                    <th>Location</th>
                    <th>Status</th>                                    
                    <th>Details</th>
                    <th>Resumes</th>                                     
                  </tr>
                </thead>
                <tbody>
                  {latestAdminPosts.map((user) => (
                     <tr key={user._id}>
                     <td>{new Date(user.date).toLocaleDateString("en-GB")}</td>                  
                     <td>{user.Ticket_no}</td>
                     <td>{user.Client_Name}</td>
                     <td>{user.Tech_stack}</td>
                     <td>{user.Location}</td>
                     <td>{user.status}</td>                  
                     <td>
                     <Link to={`/viewadminpost/${user._id}`}>
                           <Button variant="outline-dark" size="md">View</Button>
                         </Link>
                     </td>  
                     <td>
                      
                      <Link to={`/recutepost/${user._id}`}>
                            <Button variant="outline-dark" size="md">Upload</Button>
                          </Link>
                      </td>                  
                   </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col md={12}> 
              <p className="custom-text">No results found.</p>
            </Col>
          </Row>
        )}
        </Col>
      </Row>
    </Container>
  );
};

export default Adminacseeforhome;