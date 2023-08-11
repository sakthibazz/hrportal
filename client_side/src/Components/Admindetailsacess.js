import React, { useState, useEffect } from "react";
import { Table, Container, Row, Col, Form, Button, Pagination } from "react-bootstrap";
import { getAdminPostbyStatus } from "../helper/Helper";
import { Link } from "react-router-dom";

const Admindetailsacess = () => {
  const [allAdminPosts, setAllAdminPosts] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [ticketSearchTerm, setTicketSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5; // Number of results to display per page

  useEffect(() => {
    fetchAllUserDetails();
  }, []);

  const fetchAllUserDetails = async () => {
    try {
      const response = await getAdminPostbyStatus();
      const sortedResponse = response.sort((a, b) => b.Ticket_no - a.Ticket_no);
      setAllAdminPosts(sortedResponse);
      setSearchResult(sortedResponse);
    } catch (error) {
      console.error("Error fetching all user details:", error);
    }
  };

  const handleTicketSearch = () => {
    if (ticketSearchTerm === "") {
      setSearchResult(allAdminPosts);
    } else {
      const filteredResults = allAdminPosts.filter(
        user => user.Ticket_no.toString().includes(ticketSearchTerm)
      );
      setSearchResult(filteredResults);
    }
  };

  const handleSearchInputChange = event => {
    const searchTerm = event.target.value;
    setTicketSearchTerm(searchTerm);
    if (searchTerm === "") {
      setSearchResult(allAdminPosts);
    }
  };

  const paginate = pageNumber => {
    setCurrentPage(pageNumber);
  };

  const sortedSearchResult = Array.isArray(searchResult)
    ? [...searchResult].sort((a, b) => b.Ticket_no - a.Ticket_no)
    : [];

  const indexOfLastResult = currentPage * postsPerPage;
  const indexOfFirstResult = indexOfLastResult - postsPerPage;
  const resultsToDisplay = sortedSearchResult.slice(indexOfFirstResult, indexOfLastResult);

  const pageNumbers = Array.from({ length: Math.ceil(sortedSearchResult.length / postsPerPage) }, (_, i) => i + 1);






  return (
    <div className="pt-5">
    <div style={{ maxWidth: '800px', margin: '0 auto' }}> {/* Add custom div with max-width */}
      <Container fluid >
    
          <Row className="mt-3" >
            <Col md={12}>
            <Form>
                <Form.Group controlId="searchTicketNumber">
                  <Form.Label><h6>Search by Ticket Number:</h6></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Ticket Number"
                    value={ticketSearchTerm}
                    onChange={handleSearchInputChange}
                    style={{ maxWidth: '200px', }} // Adjust the maxWidth value as needed
                  />
                </Form.Group>
            
                <Button variant="info" onClick={handleTicketSearch} className="mt-2">
                  Search Ticket
                </Button>
           
              </Form>
            </Col>
          </Row>
      
        {resultsToDisplay.length > 0 ? (
          <Row className="mt-2">
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
                  {resultsToDisplay.map((user) => (
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
          <Pagination>
              {pageNumbers.map(number => (
                <Pagination.Item
                  key={number}
                  active={number === currentPage}
                  onClick={() => paginate(number)}
                  className="page-item"
                >
                  {number}
                </Pagination.Item>
              ))}
            </Pagination>
      </Container>
    </div>
  </div>
  );
};

export default Admindetailsacess;