import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, Table, Container, Row, Col, Card,Pagination } from "react-bootstrap";
import { getAdminPostClientRequirement, getAllAdminePostClientDetails } from "../helper/Helper";
import { Link } from "react-router-dom";
import Loader from './Loader';

const SearchForm = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10; // Number of results to display per page
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAllAdminPostDetails();
  }, []);

  const fetchAllAdminPostDetails = async () => {
    try {
      const response = await getAllAdminePostClientDetails();
      setSearchResult(response);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching admin post details:", error);
    }
  };

  const handleSubmit = async (values) => {
    try {
      const response = await getAdminPostClientRequirement(values);
      setSearchResult(response);
    } catch (error) {
      console.error("Error fetching admin post details:", error);
    }
  };

  const sortedSearchResult = Array.isArray(searchResult)
    ? [...searchResult].sort((a, b) => b.Ticket_no - a.Ticket_no)
    : [];

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const resultsToDisplay = sortedSearchResult.slice(indexOfFirstResult, indexOfLastResult);

 

  const pageNumbers=Array.from({length:Math.ceil(sortedSearchResult.length/resultsPerPage)},(_,i)=>i+1);

  const handlePageChange=(page)=>{
    setCurrentPage(page);
  }
  
  if (isLoading) {
    return (
     <Loader/>
    );
  }
  


  const initialValues = {
    Ticket_no: "",
    Client_Name: "",
    status: "",
    fromDate: "",
    toDate: "",
  };

  return (
    <div>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <Container fluid className="pt-5">
          <Card style={{ marginLeft: "150px" }}>
            <Row>
              <Col sm={12} md={12} className="text-center pt-5">
                <Card.Header>
                  <h2>Search Client Details</h2>
                </Card.Header>
                <Card.Body>
                  <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    <Form>
                      <Row>
                        <Col md={4}>
                          <Field
                            type="text"
                            placeholder="Enter Client Name"
                            name="Client_Name"
                            className="form-control"
                          />
                          <ErrorMessage name="Client_Name" />
                        </Col>
                        <Col md={4}>
                          <Field
                            type="number"
                            placeholder="Enter Ticket Number"
                            name="Ticket_no"
                            className="form-control"
                          />
                          <ErrorMessage name="Ticket_no" />
                        </Col>
                        <Col md={4}>
                          <Field
                            component="select"
                            name="status"
                            className="form-control"
                          >
                            <option value="">status</option>
                            <option value="Open">Open</option>
                            <option value="Interview">Interview</option>
                            <option value="Sourcing">Sourcing</option>
                            <option value="Customer">Customer</option>
                            <option value="Closed">Closed</option>
                          </Field>
                          <ErrorMessage name="status" />
                        </Col>
                      </Row>
                      <Row className="pt-3">
                        <Col md={6}>
                          <div>
                            <label>From Date:</label>
                            <Field type="date" name="fromDate" className="form-control" />
                          </div>
                        </Col>
                        <Col md={6}>
                          <div>
                            <label>To Date:</label>
                            <Field type="date" name="toDate" className="form-control" />
                          </div>
                        </Col>
                      </Row>
                      <Button className="mt-4" variant="warning" type="submit">
                        Search
                      </Button>
                    </Form>
                  </Formik>
                </Card.Body>
              </Col>
            </Row>
          </Card>

      
          {resultsToDisplay.length > 0 ? (
            <Row>
              <Col md={12} style={{ marginLeft: "50px" }}>
                <h3>Search Results:</h3>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Ticket ID</th>
                      <th>Client Name</th>
                      <th>Tech Stack</th>
                      <th>Location</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Update</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resultsToDisplay.map((user) => (
                      <tr key={user._id}>
                        <td>{user.Ticket_no}</td>
                        <td>{user.Client_Name}</td>
                        <td>{user.Tech_stack}</td>
                        <td>{user.Location}</td>
                        <td>{user.status}</td>
                        <td>{new Date(user.date).toLocaleDateString("en-GB")}</td>
                        <td>
                          <Link to={`/updateadminpost/${user._id}`}>
                            <Button>Update</Button>
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
                <p>No results found.</p>
              </Col>
            </Row>
          )}
            {/* Display pagination */}
            <Pagination>
            {pageNumbers.map(number => {
              if (Math.abs(number - currentPage) <= 2 || number === 1 || number === pageNumbers.length) {
                return (
                  <Pagination.Item
                    key={number} 
                    active={number === currentPage}
                    onClick={() => handlePageChange(number)}
                  >
                    {number}  
                  </Pagination.Item>
                );
              } else if (Math.abs(number - currentPage) === 3) {
                // Display ellipsis when there's a gap
                return <Pagination.Ellipsis key={number + 'ellipsis'} disabled />;
              }
              return null;
            })}
          </Pagination>
        </Container>
      </div>
    </div>
  );
};

export default SearchForm;