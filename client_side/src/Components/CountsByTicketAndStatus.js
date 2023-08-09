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
          <Text style={styles.title}>Funnel Chart Data</Text>
          {funnelData.map((entry, index) => (
            <Text key={`pdf-funnel-${index}`} style={styles.content}>
              {`${entry.name}: ${entry.value}`}
            </Text>
          ))}

          <Text style={styles.title}>Candidate Count Data</Text>
          <Text style={styles.content}>Total Candidates: {candidateCounts.totalnumber_of_candidates}</Text>
          <Text style={styles.content}>Rejected by Aroha: {candidateCounts.rejectedbyaroha}</Text>
          <Text style={styles.content}>Selected by Client: {candidateCounts.selectedbyclient}</Text>
          <Text style={styles.content}>Rejected by Client: {candidateCounts.rejectededbyclient}</Text>
          <Text style={styles.content}>Feedback Pending: {candidateCounts.FeedBack}</Text>

          <Text style={styles.title}>Funnel Chart</Text>
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
              <p>Total Candidates: {candidateCounts.totalnumber_of_candidates}</p>
              <p>Rejected by Aroha: {candidateCounts.rejectedbyaroha}</p>
              <p>Selected by Client: {candidateCounts.selectedbyclient}</p>
              <p>Rejected by Client: {candidateCounts.rejectededbyclient}</p>
              <p>Feedback Pending: {candidateCounts.FeedBack}</p>
              <Button variant="primary" onClick={downloadPDF}>
                Download PDF with Funnel Chart
              </Button>
            </div>
          )}
        </Col>
        <Col xs={12} md={6}>
          <div className="d-flex flex-row align-items-center">
            <div ref={funnelChartRef}>
              <FunnelChart width={400} height={300}>
                <Tooltip />
                <Funnel dataKey="value" data={funnelData}>
                  {funnelData.map((entry, index) => (
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