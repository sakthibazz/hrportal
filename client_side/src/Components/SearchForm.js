import React, { useState, useEffect } from "react";
import { Formik, Form, Field} from "formik";
import { Button, Table, Container, Row, Col, Card,Pagination } from "react-bootstrap";
import { getAllUserDetails,getUserDetails } from "../helper/Helper";
import { Link} from "react-router-dom";
import Loader from './Loader';
import {downloadResume} from '../helper/Convert';
import './FontText.css';



const SearchForm = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const resultsPerPage = 10; // Number of results to display per page

  useEffect(() => {
    fetchAllAdminPostDetails();
  }, []);

  const fetchAllAdminPostDetails = async () => {
    try {
      const response = await getAllUserDetails();
      setSearchResult(response);
      setIsLoading(false); 
    } catch (error) {
      console.error("Error fetching admin post details:", error);
    }
  };

  const handleSubmit = async (values) => {
    try {
      const response = await getUserDetails(values);
      setSearchResult(response);
      setCurrentPage(1); // Reset currentPage to 1 on new search
    } catch (error) {
      console.error("Error fetching admin post details:", error);
    }
  };

  const sortedSearchResult = Array.isArray(searchResult)
    ? [...searchResult].sort((a, b) => b.Ticket_no - a.Ticket_no)
    : [];

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const resultsToDisplay = sortedSearchResult.slice(
    indexOfFirstResult,
    indexOfLastResult
  );

 

  const pageNumbers=Array.from({length:Math.ceil(sortedSearchResult.length/resultsPerPage)},(_,i)=>i+1);

  const handlePageChange=(page)=>{
    setCurrentPage(page);
  }
  

  // Updated initial values to include fromDate and toDate fields
  const initialValues = {
    Ticket_no: "",
    CandidateName: "",
    MobileNumber: "",
    Notice_peried: "",
    Domain:"",
    fromDate: "", // Initialize fromDate with an empty string
    toDate: "",   // Initialize toDate with an empty string
  };
  
  if (isLoading) {
    return (
     <Loader/>
    );
  }

  return (
    <div className="pt-5 custom-font"> 
    <div style={{ maxWidth: '1500px', margin: '0 auto' }}> {/* Add custom div with max-width */}
      <Container fluid>
      <Card style={{ marginLeft: '150px' }} className="mt-2 pt-2">
        <Row >
         
          <Col sm={12} md={12} className="text-center pt-5">
          <Card.Header>
          <h2 className="header-title text-center" style={{ textDecoration: 'underline' }}>
          Search Candidate Details
        </h2>
            </Card.Header>
            <Card.Body>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              <Form>
                <Row >
                <Col md={4}>
                          <Field
                            type="number"
                            placeholder="Enter Req.Number"
                            name="Ticket_no"
                            className="form-control"
                          />
                        
                        </Col>
                  <Col md={4}>
                    <Field
                      type="text"
                      placeholder="Enter Candidate Name"
                      name="CandidateName"
                      className="form-control"
                    />
                  </Col>
                  <Col md={4}>
                    <Field
                      type="tel"
                      placeholder="Enter Mobile Number"
                      name="MobileNumber"
                      className="form-control"
                    />
                  </Col>
                </Row>
                <Row className="pt-5">
                  <Col md={6}>
                    <Field
                      list="data"
                      placeholder="Enter Notice Period"
                      name="Notice_peried"
                      className="form-control"
                    />
                    <datalist id="data">
                      <option>one month</option>
                      <option>two months</option>
                      <option>three months</option>
                      <option>four months</option>
                    </datalist>
                  </Col>
                  <Col md={6}>
                     <Field
                     list="Domain"
                     placeholder="Enter Domain Name"
                     name="Domain"
                     className="form-control"
                   />
                   <datalist id="Domain">
                          <option>DotNet</option>
                          <option>SAP</option>
                          <option>Data Engineering</option>
                          <option>Power BI</option>
                          <option>DB Developer</option>
                          <option>Data Scientist</option>
                          <option>Testing(Manual testing)</option>
                          <option>Testing(Automation testing)</option>
                          <option>Web Full Stack</option>
                          <option>Dot Net Full Stack</option>
                          <option>Java Full Stack</option>
                        </datalist>
                  </Col>
                </Row>
                <Row className="pt-5">
                  <Col md={6}>
                       <div>
                      <label>From Date</label>
                      <Field type="date" name="fromDate" className="form-control" />
                    </div>
                   
                  </Col>
                  <Col md={6}>
                  <div>
                      <label>To Date</label>
                      <Field type="date" name="toDate" className="form-control" />
                    </div>
                  </Col>
                </Row>
                <Button className="mt-5" variant="warning" type="submit">Search</Button>
              </Form>
            </Formik>
            </Card.Body>
          </Col>
        </Row>
      </Card>
        {resultsToDisplay.length > 0 ? (
             <Row className="mt-5">
             <Col md={12} style={{ marginLeft: "50px" }}>
             <h3 className="text-center pt-5"  style={{ textDecoration: "underline" }}>Candidate Details</h3>
               <Table style={{ width: '100%', border: 'none' }} striped hover>              
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>Email</th>
                    <th>CTC</th>
                    <th>ECTC</th>
                    <th>Notice Period</th>
                    <th>Location</th> 
                    <th>Status</th>
                    <th>Resume</th>
                    <th>Profile</th>
                  </tr>
                </thead>
                <tbody>
                {resultsToDisplay.map((user) =>  (
                    <tr key={user._id}>
                      <td>{user.CandidateName}</td>
                      <td>{user.MobileNumber}</td>
                      <td>{user.Email}</td>
                      <td>{user.CTC}</td>
                      <td>{user.ECTC}</td>
                      <td>{user.Notice_peried}</td>
                      <td>{user.Current_location}</td> 
                      <td>{user.Status}</td> 
                      <td>
                        <Button onClick={() => downloadResume(user?.Upload_resume || "N/A")} variant="outline-success">
                          Download
                        </Button>
                      </td>
                      <td>
                      <Link to={`/updatepost/${user._id}`}>
                        <Button variant="outline-dark">Update</Button>
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
            <Pagination style={{ marginTop: '10px', justifyContent: 'center' }}>
        {pageNumbers.map((number) => {
        if (Math.abs(number - currentPage) <= 2 || number === 1 || number === pageNumbers.length) {
        return (
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => handlePageChange(number)}
          style={{

            border: '1px solid #007bff',
            margin: '2px',
            cursor: 'pointer',
          }}
        >
          {number}
        </Pagination.Item>
      );
    } else if (Math.abs(number - currentPage) === 3) {
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

export default SearchForm;