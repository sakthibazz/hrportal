import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { getTicketNumber } from '../helper/Helper';
import HeaderNavbar from './HeaderNavbar';
import SideNavbar from './SideNavbar';

const Ticketdetails = () => {
  const [ticketDetails, setTicketDetails] = useState(null);
  const [ticketNotFound, setTicketNotFound] = useState(false);

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

  const handleTicketNumberChange = async (event) => {
    const ticketNumber = event.target.value;
    if (ticketNumber.trim() === '') {
      setTicketDetails(null);
      setTicketNotFound(true);
      return;
    }

    const details = await getTicketNumber(ticketNumber);
    setTicketDetails(details);
  };

  return (
    <div>
      <Container fluid className="p-0">
        <Row>
          <Col>
            <HeaderNavbar />
          </Col>
        </Row>
        <Row>
          <Col xs={2} className="pt-5">
            <SideNavbar />
          </Col>
          <Col xs={10} className="pt-5">
            <Container fluid>
              <Row>
                <Col xs={12} className="pt-5">
                  <h3>Enter Ticket Number:</h3>
                  <Form>
                    <Form.Group controlId="ticketNumber">
                      <Form.Control
                        type="number"
                        name="ticketNumber"
                        onChange={handleTicketNumberChange}
                        placeholder="Ticket Number"
                        className="w-50"
                      />
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
              <Row>
                <Col className="pt-4">
                  {ticketDetails ? (
                    <div>
                      <h4>Ticket Details:</h4>
                      <table>
                        <tbody>
                          <tr>
                            <th>Ticket Number:</th>
                            <td>{ticketDetails.Ticket_no || 'N/A'}</td>
                          </tr>
                          <tr>
                            <th>Candidate Name:</th>
                            <td>{ticketDetails.CandidateName || 'N/A'}</td>
                          </tr>
                          <tr>
                            <th>MobileNumber:</th>
                            <td>{ticketDetails.MobileNumber || 'N/A'}</td>
                          </tr>
                          <tr>
                            <th>Email:</th>
                            <td>{ticketDetails.Email || 'N/A'}</td>
                          </tr>
                          <tr>
                            <th>Year of Experience:</th>
                            <td>{ticketDetails.Yre_of_exp || 'N/A'}</td>
                          </tr>
                          <tr>
                            <th>Relevent Year of Experience:</th>
                            <td>{ticketDetails.Relevent_Yre_of_exp || 'N/A'}</td>
                          </tr>
                          <tr>
                            <th>Domain:</th>
                            <td>{ticketDetails.Domain || 'N/A'}</td>
                          </tr>
                          <tr>
                            <th>CTC:</th>
                            <td>{ticketDetails.CTC || 'N/A'}</td>
                          </tr>
                          <tr>
                            <th>ECTC:</th>
                            <td>{ticketDetails.ECTC || 'N/A'}</td>
                          </tr>
                          <tr>
                            <th>Current location:</th>
                            <td>{ticketDetails.Current_location || 'N/A'}</td>
                          </tr>
                          <tr>
                            <th>Preferred location:</th>
                            <td>{ticketDetails.Preffered_location || 'N/A'}</td>
                          </tr>
                          <tr>
                            <th>Reason for changes:</th>
                            <td>{ticketDetails.Reason_for_change || 'N/A'}</td>
                          </tr>
                          <tr>
                            <th>Notice period:</th>
                            <td>{ticketDetails.Notice_peried || 'N/A'}</td>
                          </tr>
                          <tr>
                            <th>Comment:</th>
                            <td>{ticketDetails.Comment || 'N/A'}</td>
                          </tr>
                          <tr>
                            <th>Status:</th>
                            <td>{ticketDetails.Status || 'N/A'}</td>
                          </tr>
                          <tr>
                            <th>Client feedback:</th>
                            <td>{ticketDetails.Client_feedback || 'N/A'}</td>
                          </tr>
                         
                          <tr>
                            <th>Download resume:</th>
                            <td>
                              <Button
                                className="btn btn-primary"
                                onClick={() => downloadResume(ticketDetails?.Upload_resume || 'N/A')}
                              >
                                Download
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  ) : ticketNotFound ? (
                    <p>No ticket details found.</p>
                  ) : null}
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Ticketdetails;