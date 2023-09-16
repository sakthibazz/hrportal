import React, { useEffect, useState } from 'react';
import { Table, Container, Row, Col, Pagination } from 'react-bootstrap';
import Loader from './Loader';
import { fetchUserWorkingProgress } from '../helper/Helper';

const Analiseuserwork = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const resultsPerPage = 10;

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await fetchUserWorkingProgress();
        setData(result);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setData([]); // Set data to an empty array to avoid "data.slice is not a function" error
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentRecords = Array.isArray(data) ? data.slice(indexOfFirstResult, indexOfLastResult) : [];

  const pageNumbers = Array.from(
    { length: Math.ceil(data.length / resultsPerPage) },
    (_, i) => i + 1
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Container fluid>
      <Row className="mt-2">
        <Col md={12} style={{ marginLeft: '40px' }}>
          <h2 className="header-title ml-5">Current Day Working Progress</h2>
          {isLoading ? (
            <Loader />
          ) : data.length > 0 ? (
            <>
              <Table className="custom-font" style={{ width: '100%', border: 'none' }} striped hover>
                <thead>
                  <tr>
                    <th>Req.No</th>
                    <th>Recruiter</th>
                    <th>Client</th>
                    <th>Job Title</th>
                    <th>Sourced</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRecords.map((item, index) => (
                    <tr key={index}>
                      <td>{item.Ticket_no}</td>
                      <td>{item.username}</td>
                      <td>{item.Client_Name}</td>
                      <td>{item.Tech_stack}</td>
                      <td>{item.count}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
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
};

export default Analiseuserwork;