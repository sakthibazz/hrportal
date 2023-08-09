import React, { useState, useEffect } from "react";
import { Button, Table, Container, Row, Col } from "react-bootstrap";
import { getArohaRecruitments } from "../helper/Helper";




const SearchForm = () => {
  const [searchResult, setSearchResult] = useState([]);

  // Fetch all user details on component mount
  useEffect(() => {
    fetchAllUserDetails();
  }, []);

  const fetchAllUserDetails = async () => {
    try {
      const response = await getArohaRecruitments();
     
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


  return (
    <div className="pt-5">
    <div style={{ maxWidth: '800px', margin: '0 auto' }}> {/* Add custom div with max-width */}
      <Container fluid >
      
        {searchResult.length > 0 ? (
          <Row>
            <Col md={12} style={{ marginLeft: '30px' }}>
              <h3>Aroha Technologies Bench Candidates:</h3>
              <Table striped bordered hover >
                <thead>
                  <tr>
                    <th>Candidate Name</th>
                    <th>Mobile Number</th>
                    <th>Email</th>
                    <th>Domain</th>
                    <th>Year Of Experience</th>
                    
                    <th>Location</th>
                    <th>Download Resume</th>
                  
                  </tr>
                </thead>
                <tbody>
                  {searchResult.map((user) => (
                    <tr key={user._id}>
                      <td>{user.CandidateName}</td>
                      <td>{user.MobileNumber}</td>
                      <td>{user.Email}</td>
                      <td>{user.Domain}</td>
                      <td>{user.Yre_of_exp}</td>
                    
                      <td>{user.Current_location}</td>
                      <td>
                        <Button onClick={() => downloadResume(user?.Upload_resume || "N/A")} className="btn btn-success">
                          Download
                        </Button>
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
      </Container>
    </div>
  </div>
  );
};

export default SearchForm;