import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { getRecuterSourcedDetails } from '../helper/Helper'; // Import your API function

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = async (values) => {
    try {
      // Use your helper function to make the API request
      const data = await getRecuterSourcedDetails(values.CandidateName);

      if (data.error) {
        setSearchResults({ error: data.error });
      } else {
        setSearchResults(data);
      }
    } catch (error) {
      setSearchResults({ error: "Failed to fetch user details" });
    }
  };

  const initialValues = {
    CandidateName: '',
    fromDate: '',
    toDate: '',
  };

  return (
    <Container fluid>
      <Card style={{ margin: '20px' }}>
        <Card.Header as="h1">Search User Details</Card.Header>
        <Card.Body>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSearch}
          >
            <Form>
              <Row>
                <Col md={6}>
                  <Field
                    type="text"
                    placeholder="Enter candidate name"
                    name="CandidateName"
                    className="form-control"
                  />
                </Col>
                <Col md={6}>
                  <button type="submit" className="btn btn-primary">
                    Search
                  </button>
                </Col>
              </Row>
              <Row>
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
                    
            </Form>
          </Formik>

          {/* Display search results */}
          {searchResults && (
            <div>
              <h2>Search Results</h2>
              {searchResults.error ? (
                <p>{searchResults.error}</p>
              ) : (
                <div>
                  <p>Username: {searchResults.username}</p>
                  <p>Total Candidates: {searchResults.statusCounts.total}</p>
                </div>
              )}
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SearchPage;