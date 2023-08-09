import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, Table, Container, Row, Col, Card,Pagination } from "react-bootstrap";
import { getAllUserDetails } from "../helper/Helper";
import { Link} from "react-router-dom";



const SearchForm = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 5; // Number of results to display per page


  // Fetch all user details on component mount
  useEffect(() => {
    fetchAllUserDetails();
  }, []);

  const fetchAllUserDetails = async () => {
    try {
      const response = await getAllUserDetails();
      setAllUsers(response);
      setSearchResult(response);
    } catch (error) {
      console.error("Error fetching all user details:", error);
    }
  };
  const downloadResume = (resumeUrl) => {
    if (resumeUrl !== 'N/A') {
      // Logic to initiate the download using the provided resumeUrl
      // For example, you can create an anchor element and simulate a click to download the file.
      var link = document.createElement('a');
      link.href = resumeUrl;
      link.download = 'resume.pdf'; // You can set the desired file name here
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Handle the case when the resume is not available
      alert('Resume not available for download.');
    }
  };

  const handleSubmit = (values) => {
    try {
      // Check if allUsers is empty or values is undefined
      if (!allUsers.length || !values) {
        console.log("No users or values are empty.");
        return;
      }
  
      // Check if toDate is lesser than fromDate
      if (values.fromDate && values.toDate && new Date(values.fromDate) > new Date(values.toDate)) {
        alert("To Date cannot be earlier than From Date.");
        return;
      }
  
      const filteredUsers = allUsers.filter((user) => {
        // Convert search values to lowercase
        const searchValues = {
          ...values,
          CandidateName: values.CandidateName ? values.CandidateName.toLowerCase() : "",
          Domain: values.Domain ? values.Domain.toLowerCase() : "",
          Notice_peried: values.Notice_peried ? values.Notice_peried.toLowerCase() : "",
        };
  
        // Convert data fields to lowercase
        const userDataLowerCase = {
          ...user,
          CandidateName: user.CandidateName.toLowerCase(),
          Domain: user.Domain.toLowerCase(),
          Notice_peried: user.Notice_peried.toLowerCase(),
        };
  
        const userRegistrationDate = new Date(user.date);
  
        // Check if the user registration date is within the selected date range
        const isDateInRange =
          (!values.fromDate || userRegistrationDate >= new Date(values.fromDate)) &&
          (!values.toDate || userRegistrationDate <= new Date(values.toDate));
  
        // Include records for the "fromDate" or the "toDate"
        const isFromDateMatch =
          values.fromDate && userRegistrationDate.toDateString() === new Date(values.fromDate).toDateString();
        const isToDateMatch = values.toDate && userRegistrationDate.toDateString() === new Date(values.toDate).toDateString();
  
        if (isFromDateMatch || isToDateMatch) {
          // If date range matches, apply additional filters for candidate name and mobile number if provided
          return (
            (!searchValues.CandidateName || userDataLowerCase.CandidateName.includes(searchValues.CandidateName)) &&
            (!values.MobileNumber || user.MobileNumber.toString().includes(values.MobileNumber))&&
            (!searchValues.Domain || userDataLowerCase.Domain.includes(searchValues.Domain)) &&
            (!searchValues.Notice_peried || userDataLowerCase.Notice_peried.includes(searchValues.Notice_peried))
          );
        }
  
        // Apply all the other filters as before
        return (
          isDateInRange &&
          (!searchValues.Ticket_no || userDataLowerCase.Ticket_no.includes(searchValues.Ticket_no)) &&
          (!searchValues.CandidateName || userDataLowerCase.CandidateName.includes(searchValues.CandidateName)) &&
          (!values.MobileNumber || user.MobileNumber.toString().includes(values.MobileNumber))  &&
          (!searchValues.Email || userDataLowerCase.Email.includes(searchValues.Email)) &&
          (!searchValues.Domain || userDataLowerCase.Domain.includes(searchValues.Domain)) &&
          (!searchValues.Notice_peried || userDataLowerCase.Notice_peried.includes(searchValues.Notice_peried))
        );
      });
  
      setSearchResult(filteredUsers);
    } catch (error) {
      console.error("Error filtering users:", error);
    }
  };
    // Pagination logic
    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = searchResult.slice(indexOfFirstResult, indexOfLastResult);
  
 
  
  

    const pageNumbers=Array.from({length:Math.ceil(searchResult.length/resultsPerPage)},(_,i)=>i+1);

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

  return (
    <div className="pt-5">
    <div style={{ maxWidth: '800px', margin: '0 auto' }}> {/* Add custom div with max-width */}
      <Container fluid>
        <Card style={{ marginLeft: '150px' }}>
        <Row>
         
          <Col sm={12} md={12} className="text-center pt-5">
          <Card.Header>
            <h2>Search User Details</h2>
            </Card.Header>
            <Card.Body>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              <Form>
                <Row>
                  <Col md={6}>
                    <Field
                      type="text"
                      placeholder="Enter candidate name"
                      name="CandidateName"
                      className="form-control"
                    />
                    <ErrorMessage name="CandidateName" />
                  </Col>
                  <Col md={6}>
                    <Field
                      type="tel"
                      placeholder="Enter Mobile Number"
                      name="MobileNumber"
                      className="form-control"
                    />
                    <ErrorMessage name="MobileNumber" />
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
                    <ErrorMessage name="Notice_peried" />
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
                   <ErrorMessage name="Domain" />
                  </Col>
                </Row>
                <Row className="pt-5">
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
                <Button className="mt-5" variant="warning" type="submit">Search</Button>
              </Form>
            </Formik>
            </Card.Body>
          </Col>
        </Row>
        </Card>

        {searchResult.length > 0 ? (
          <Row>
            <Col md={12}>
              <h3>Search Results:</h3>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Candidate Name</th>
                    <th>Mobile Number</th>
                    <th>Email</th>
                    <th>CTC</th>
                    <th>ECTC</th>
                    <th>Notice Period</th>
                    <th>Location</th>
                    <th>Download Resume</th>
                    <th>Update Candidate profile</th>
                  </tr>
                </thead>
                <tbody>
                {currentResults.map((user) =>  (
                    <tr key={user._id}>
                      <td>{user.CandidateName}</td>
                      <td>{user.MobileNumber}</td>
                      <td>{user.Email}</td>
                      <td>{user.CTC}</td>
                      <td>{user.ECTC}</td>
                      <td>{user.Notice_peried}</td>
                      <td>{user.Current_location}</td> 
                      <td>
                        <Button onClick={() => downloadResume(user?.Upload_resume || "N/A")} className="btn btn-success">
                          Download
                        </Button>
                      </td>
                      <td>
                      <Link to={`/updatepost/${user._id}`}>
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
        {pageNumbers.map(number => (
          <Pagination.Item
            key={number} 
            active={number === currentPage}
            onClick={() => handlePageChange(number)}
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

export default SearchForm;