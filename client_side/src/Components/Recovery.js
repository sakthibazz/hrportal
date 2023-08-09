import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Toaster, toast } from 'react-hot-toast';
import { useAuthStore } from '../store/store';
import { generateOTP, verifyOTP } from '../helper/Helper';
import { useNavigate } from 'react-router-dom';

const Recovery = () => {
  const { username } = useAuthStore(state => state.auth);
  const [OTP, setOTP] = useState('');
  const [otpSent, setOtpSent] = useState(false); // State variable to track whether OTP has been sent
  const navigate = useNavigate();

  async function handleSendOTP() {
    try {
      const sendPromise = generateOTP(username);
      toast.promise(sendPromise, {
        loading: 'Sending...', // Display loading spinner while sending the OTP
        success: () => {
          setOtpSent(true); // Set otpSent to true after sending OTP
          return 'OTP has been sent to your email';
        },
        error: 'Failed to send OTP!',
      });
      await sendPromise; // Wait for the OTP sending process to complete (success or error)
    } catch (error) {
      toast.error('Failed to generate OTP!');
      console.log(error);
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const { status } = await verifyOTP({ username, code: OTP.toString() });
      if (status === 201) {
        toast.success('Verification successful');
        navigate('/reset');
      }
    } catch (error) {
      toast.error('Wrong OTP! Please check your email again.');
      console.log(error);
    }
  }

  function handleResendOTP() {
    handleSendOTP(); // Resend the OTP when the "Re-Send OTP" button is clicked
  }

  return (
    <Container fluid className="vh-100 d-flex align-items-center justify-content-center">
      <Toaster position="top-center" reverseOrder={false} />
      <Row>
        <Col className="text-center">
          <Card className="title py-4">
            <Card.Body>
            <h4 className="text-4xl font-bold mb-4">Recovery</h4>
             
              {!otpSent ? ( // Render the "Send" button if OTP has not been sent
                <div>
                <span className="text-lg w-2/3 text-center text-muted">
                Send OTP to your e-mail to recover
                </span> &nbsp;
                  <Button
                    type="button"
                    className="btn btn-primary custom-button"
                    onClick={handleSendOTP}
                  >
                    Send OTP
                  </Button>
                </div>
              ) : (
                <Form className="py-1" onSubmit={onSubmit}>
                  <div className="textbox d-flex flex-column align-items-center">
                    <span className="py-4 text-lg text-center text-muted fw-bold">
                      Enter 6-Digit OTP Sent to Your Email
                    </span>
                    <Form.Control
                      onChange={(e) => setOTP(e.target.value)}
                      type="text"
                      placeholder="OTP..."
                      className="w-75 mb-4"
                      style={{ fontSize: '18px', padding: '10px' }}
                    />
                    <Button type="submit" className="btn btn-success custom-button">
                      Verify
                    </Button>
                  </div>
                  <div className="py-2">
                    <span className="text-muted">
                      Can't Get OTP?:
                      <Button
                        className="btn btn-danger"
                        onClick={handleResendOTP}
                      >
                        Re-Send OTP
                      </Button>
                    </span>
                  </div>
                </Form>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Recovery;