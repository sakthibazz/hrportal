import React, { useState, useEffect } from "react";
import { Button, Table, Container, Row, Col } from "react-bootstrap";
import { getAdminPostbyStatus } from "../helper/Helper";
import { Link } from "react-router-dom";




const Admindetailsacess = () => {
  const [searchResult, setSearchResult] = useState([]);

  // Fetch all user details on component mount
  useEffect(() => {
    fetchAllUserDetails();
  }, []);

  const fetchAllUserDetails = async () => {
    try {
      const response = await getAdminPostbyStatus();
      const sortedResponse = response.sort((a, b) => b.Ticket_no - a.Ticket_no); // Sorting in descending order
      setSearchResult(sortedResponse);
    } catch (error) {
      console.error("Error fetching all user details:", error);
    }
  };



  return (
    <div className="pt-5">
    <div style={{ maxWidth: '800px', margin: '0 auto' }}> {/* Add custom div with max-width */}
      <Container fluid >
      
        {searchResult.length > 0 ? (
          <Row>
            <Col md={12} style={{ marginLeft: '30px' }}>
              <h3>Aroha Technologies Client Requirement:</h3>
              <Table striped bordered hover >
                <thead>
                  <tr>
                  <th> Here TO GO</th>
                    <th>Ticket No</th>
                    <th>Client_Name</th>
                    <th>Tech Stack</th>
                    <th>Location</th>
                    <th>Status</th>
                    
                    <th>Date</th>
                    
                  
                  </tr>
                </thead>
                <tbody>
                  {searchResult.map((user) => (
                    <tr key={user._id}>
                       <td>
                      <Link to={`/recutepost/${user._id}`}>
                            <Button variant="dark">Post</Button>
                          </Link>
                      </td>
                      <td>{user.Ticket_no}</td>
                      <td>{user.Client_Name}</td>
                      <td>{user.Tech_stack}</td>
                      <td>{user.Location}</td>
                      <td>{user.status}</td>
                    
                      <td>{new Date(user.date).toLocaleDateString("en-GB")}</td>
                     
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col md={12}>
              <p>No results found.</p>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  </div>
  );
};

export default Admindetailsacess;