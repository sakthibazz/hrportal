import React, { useEffect, useState } from 'react';
import { Table, Container, Row, Col, Pagination} from 'react-bootstrap';
import { getCountsForAllTickets } from "../helper/Helper";
import Loader from './Loader';

function Adminagetdetails() {
  const [counts, setCounts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const resultsPerPage = 10;

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCountsForAllTickets();

        // Check if data is an array before sorting
        if (Array.isArray(data)) {
          data.sort((a, b) => b.Ticket_no - a.Ticket_no);
          setCounts(data);
          setError(null); // Clear any previous errors
        } else {
          setError("Data is not an array");
          setCounts([]); // Set an empty array to clear any previous data
        }

        setIsLoading(false);
      } catch (error) {
        setError(error.message); // Set the error message
        setIsLoading(false);
      }
    }

    fetchData(); 
  }, []); 

  const indexOfLastResult = currentPage * resultsPerPage; 
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentRecords = counts.slice(indexOfFirstResult, indexOfLastResult);

  const pageNumbers = Array.from({ length: Math.ceil(counts.length / resultsPerPage) }, (_, i) => i + 1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container fluid>
      <Row className="mt-2">
        <Col md={12} style={{ marginLeft: '40px' }}> 
          <h2 className="header-title ml-5">Report</h2>
          {counts.length > 0 ? (
            <>
              <Table className="custom-font" style={{ width: '100%', border: 'none' }} striped hover>
                {/* Table headers */}
                <thead>
                  <tr>
                    <th>Req.No</th>
                    <th>Date</th>
                    <th>Client</th>
                    <th>Job Title</th>
                    <th>Status</th>
                    <th>Total Sourced</th>
                    <th>Aroha Rejected</th>
                    <th>Submitted</th>
                    <th>Client Rejected</th>
                    <th>Client Selected</th>
                  </tr>
                </thead>
                {/* Table body */}
                <tbody>
                  {currentRecords.map((count) => (
                    <tr key={count.Ticket_no}>
                      <td>{count.Ticket_no}</td>
                      <td>{new Date(count.date).toLocaleDateString("en-GB")}</td>
                      <td>{count.Client_Name}</td>
                      <td>{count.Tech_stack.map(tech => tech.name).join(', ')}</td>
                      <td>{count.status}</td>
                      <td>{count.totalnumber_of_candidates}</td>
                      <td>{count.rejectedbyaroha}</td>
                      <td>{count.submittedtoclient}</td>
                      <td>{count.rejectededbyclient}</td>
                      <td>{count.selectedbyclient}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              {/* Pagination */}
              <Pagination style={{ marginTop: '10px', justifyContent: 'center' }}>
                {pageNumbers.map((number) => (
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
                ))}
              </Pagination>
            </>
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
}

export default Adminagetdetails;