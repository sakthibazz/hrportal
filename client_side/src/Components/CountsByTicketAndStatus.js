import React, { useState, useRef } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import { FunnelChart, Funnel, Tooltip, Cell } from 'recharts';
import { saveAs } from 'file-saver';
import { pdf, Document, Page, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { getCandidateCounts } from '../helper/Helper'; // Adjust the path to helper.js
import { toPng } from 'html-to-image';
function CountsByTicketAndStatus() {
  const [candidateCounts, setCandidateCounts] = useState(null);
  const [error, setError] = useState('');
  const [inputTicketNumber, setInputTicketNumber] = useState('');

  const funnelChartRef = useRef(null);

  const fetchCandidateCounts = async (ticketNumber) => {
    setError('');

    try {
      const counts = await getCandidateCounts(ticketNumber);
      if (counts.error) {
        setError(counts.error);
        setCandidateCounts(null);
      } else {
        setCandidateCounts(counts);
      }
    } catch (error) {
      setError('Failed to fetch candidate counts');
      setCandidateCounts(null);
    }
  };

  const initialValues = {
    ticketNumber: '',
  };

  const handleChange = (event) => {
    setInputTicketNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchCandidateCounts(inputTicketNumber);
  };

  const funnelData = [
    { name: 'Total Candidates', value: candidateCounts?.totalnumber_of_candidates || 0 },
    { name: 'Rejected by Aroha', value: candidateCounts?.rejectedbyaroha || 0 },
    { name: 'Selected by Client', value: candidateCounts?.selectedbyclient || 0 },
    { name: 'Rejected by Client', value: candidateCounts?.rejectededbyclient || 0 },
    { name: 'Feedback Pending', value: candidateCounts?.FeedBack || 0 },
  ];

  const funnelColors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];
  const downloadPDF = async () => {
    const funnelImage = await toPng(funnelChartRef.current);

    const MyDocument = ({ funnelData, candidateCounts }) => (
      <Document>
        <Page style={styles.page}>
        <Text style={styles.title}>Report:</Text>
          {funnelData.map((entry, index) => (
            entry.value > 0 && (
              <Text key={`pdf-funnel-${index}`} style={{ ...styles.content, color: funnelColors[index % funnelColors.length] }}>
                {`${entry.name}: ${entry.value}`}
              </Text>
            )
          ))}
          <Image src={funnelImage} style={styles.image} />
        </Page>
      </Document>
    );

    const styles = StyleSheet.create({
      page: {
        padding: 30,
      },
      title: {
        fontSize: 16,
        marginBottom: 10,
        fontWeight: 'bold',
      },
      content: {
        fontSize: 12,
        marginBottom: 5,
      },
      image: {
        width: '100%',
        height: 200,
      },
    });

    const pdfBlob = await pdf(<MyDocument funnelData={funnelData} candidateCounts={candidateCounts} />).toBlob();
    saveAs(pdfBlob, `CandidateCounts_Ticket_${candidateCounts.ticketNumber}.pdf`);
  };
  const sortedFunnelData = [...funnelData].sort((a, b) => b.value - a.value);

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h2 className="text-center">Fetch Candidate Counts</h2>
          <Formik initialValues={initialValues}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="ticketNumber">
                <Form.Label>Enter Ticket Number:</Form.Label>
                <Form.Control
                  type="text"
                  name="ticketNumber"
                  value={inputTicketNumber}
                  onChange={handleChange}
                />
              </Form.Group>
              <br />
              <Button variant="primary" type="submit">
                Fetch Counts
              </Button>
            </Form>
          </Formik>

          {error && <p className="text-danger">{error}</p>}

          {candidateCounts && (
            <div>
              <h3>Candidate Counts for Ticket {candidateCounts.ticketNumber}</h3>
              <h4>Total Candidates: {candidateCounts.totalnumber_of_candidates}</h4>
              <h4>Rejected by Aroha: {candidateCounts.rejectedbyaroha}</h4>
              <h4>Selected by Client: {candidateCounts.selectedbyclient}</h4>
              <h4>Rejected by Client: {candidateCounts.rejectededbyclient}</h4>
              <h4>Feedback Pending: {candidateCounts.FeedBack}</h4>
              <Button variant="warning" onClick={downloadPDF}>
                Download PDF
              </Button>
            </div>
          )}
        </Col>
        <Col xs={12} md={6} className='pt-5'>
          <div className="d-flex flex-row align-items-center">
            <div ref={funnelChartRef}>
            <FunnelChart width={400} height={300}>
            <Tooltip />
                <Funnel dataKey="value" data={sortedFunnelData}>
                  {sortedFunnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={funnelColors[index % funnelColors.length]} />
                  ))}
                </Funnel>
              </FunnelChart>
            </div>
            <div className="ml-4">
              {funnelData.map((entry, index) => (
                entry.value > 0 && (
                  <div key={index} className="text-center">
                    <span style={{ color: funnelColors[index % funnelColors.length] }}>
                      {`${entry.name}: ${entry.value}`}
                    </span>
                  </div>
                )
              ))}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default CountsByTicketAndStatus;