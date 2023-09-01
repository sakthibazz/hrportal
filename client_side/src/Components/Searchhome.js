import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Container, Row, Col } from 'react-bootstrap';
import { getRecuterSourcedDetails } from '../helper/Helper'; // Import your API function

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = async (values) => {
    try {
      // Use your helper function to make the API request
      const data = await getRecuterSourcedDetails(
        values.CandidateName,
        values.fromDate,
        values.toDate
      );

      if (data.error) {
        setSearchResults({ error: data.error });
      } else {
        setSearchResults(data);
      }
    } catch (error) {
      setSearchResults({ error: "No records found" });
    }
  };

  const initialValues = {
    CandidateName: '',
    fromDate: '',
    toDate: '',
  };

  return (
    <Container fluid>
      <Row>
        <Col md={8}>
          <div style={{ margin: '20px' }}>
            <h1>Search User Details</h1>
            <Formik initialValues={initialValues} onSubmit={handleSearch}>
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
          </div>
        </Col>
        <Col md={4}>
          <div className="search-results pt-5">
            {/* Display search results here */}
            {searchResults !== null ? (
              <div>
                <h2>Search Results</h2>
                {searchResults.error ? (
                  <p>{searchResults.error}</p>
                ) : (
                  <div>
                    <strong><i>Username: {searchResults.username}</i></strong><br/>
                    <strong><i>Total Candidates: {searchResults.totalCandidates}</i></strong><br/>
                    <strong><i>Yet to Receive feedback: {searchResults.statusCounts["Yet to Receive feedback"]}</i></strong><br/>
                    <strong><i>Selected By Client: {searchResults.statusCounts["Selected By Client"]}</i></strong><br/>
                    <strong><i>Rejected By Aroha: {searchResults.statusCounts["Rejected By Aroha"]}</i></strong><br/>
                    <strong><i>Rejected By Client: {searchResults.statusCounts["Rejected By Client"]}</i></strong><br/>
                    <strong><i>Remaining: {searchResults.statusCounts.remaining}</i></strong>
                  </div>
                )}
              </div>
            ) : (
              null
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchPage;