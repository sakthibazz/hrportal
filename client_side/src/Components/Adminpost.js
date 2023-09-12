import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Modal, } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import convertToBase64 from '../helper/Convert';
import { Adminpost } from '../helper/Helper';
import { adminPostValidate } from '../helper/Validate';
import './FontText.css';

const Adminposts = () => {
  const [file, setFile] = useState();
  const [showModal, setShowModal] = useState(false);
  const [postedDetails, setPostedDetails] = useState(null);
  const [ticketNumber, setTicketNumber] = useState(null); // Add this state for the ticket number

  const formik = useFormik({
    initialValues: {
      Client_Name: '',
      Open_position: '',
      Yre_of_exp: '',
      Tech_stack: '',
      Budget: '',
      Location: '',
      Job_Description: '',
      Job_Des: '',
      Job_Mode: '',
      Mode:'',
      status:"Open"
    },
    validate: adminPostValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values, { resetForm }) => {
      if (!values.Job_Des && !file) {
        toast.error('Please provide a Job Description or upload a file.');
        return;
      }
      values.Job_Description = file || '';

      const AdminpostPromise = Adminpost(values);

      resetForm();
  

      toast.promise(AdminpostPromise, {
        loading: 'Updating...',
        success: (data) => {
          setTicketNumber(data.adminModule.Ticket_no); 
          setPostedDetails(values);
          setShowModal(true);// Show the modal after posting
          return <b>Registered Successfully...!</b>;
        },
        error: <b>Could Not Register.</b>
      });
    }
  });

  const onUpload = async (e) => {
    const uploadedFile = e.target.files[0];

    if (uploadedFile) {
      // Ensure the uploaded file is a valid PDF or other supported file types
      if (uploadedFile.type === 'application/pdf') {
        const Resume_Upload = await convertToBase64(uploadedFile);
        setFile(Resume_Upload);
        formik.setErrors(adminPostValidate(formik.values, Resume_Upload)); // Validate with updated file
      } else {
        toast.error('Please upload a valid PDF or image file.');
      }
    }
  };

  // Function to hide the modal
  const hideModal = () => {
    setShowModal(false);
  };

  return (
    <Container fluid className="p-0">
    <Toaster position="top-center" reverseOrder={false}></Toaster>
    <Row>
      <Col xs={10} md={10} lg={12} className='pt-5'>
        <Container fluid className="vh-100  align-items-center justify-content-center">
          <Row className="justify-content-center">
            <Col xs={10} md={10} lg={10} className="text-center py-4">
              <Card className="title py-4 mt-30" >
              <Card.Header className='pt-30'>
                    <h4 className="text-5xl font-bold">Post New Client Requirements..!</h4>
                    <span className="py-4 text-xl w-2/3 text-center text-muted">
                 
                    </span>
                  </Card.Header>
                <Card.Body>
                  <Form onSubmit={formik.handleSubmit} className='pt-4'>
                  <Row>
                    <Col xs={5}>
                    <Form.Select
                        {...formik.getFieldProps('status')}
                        disabled
                      >
                        <option value="Open">Status:Open</option>
                      </Form.Select>
                    </Col>
                    </Row>
                    <br/>
                    <Row>
                      <Col xs={6}>
                        <Form.Control
                          {...formik.getFieldProps('Client_Name')}
                          type="text"
                          placeholder="Client Name*"
                          className="w-100 mb-2"
                          required
                        />
                      </Col>
                      <Col xs={6}>
                        <Form.Control
                          {...formik.getFieldProps('Open_position')}
                          type="number"
                          placeholder="Opening position*"
                          className="w-100 mb-2"
                          required
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={6}>
                        <Form.Control
                          {...formik.getFieldProps('Yre_of_exp')}
                          type="text"
                          placeholder="Years of Experience*"
                          className="w-100 mb-2"
                          required
                        />
                      </Col>
                      <Col xs={6}>
                      <Form.Control
                          {...formik.getFieldProps('Tech_stack')}
                          list="Tech_stack"
                          placeholder="Job Title*"
                          className="w-100 mb-2"
                          required
                        />
                        <datalist id="Tech_stack">
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
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={6}>
                        <Form.Control
                          {...formik.getFieldProps('Budget')}
                          type="number"
                          placeholder="Budget*"
                          className="w-100 mb-2"
                          required
                        />
                      </Col>
                      <Col xs={6}>
                      <Form.Control
                          {...formik.getFieldProps('Location')}
                          list="Location"
                          placeholder="Location*"
                          className="w-100 mb-2"
                          required
                        />
                        <datalist id="Location">
                          <option>Bengaluru (Bangalore)</option>
                          <option>Chennai (Madras)</option>
                          <option>Delhi</option>
                          <option>Mumbai</option>
                          <option>Hyderabad</option>
                          <option>Kolkata (Calcutta)</option>
                          <option>Pune</option>
                          <option>Ahmedabad</option>
                          <option>Lucknow</option>
                          <option>Indore</option>
                          <option>Chandigarh</option>
                        </datalist>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={6}>
                      <Form.Select
                        {...formik.getFieldProps('Job_Mode')}
                        required
                      >
                        <option value="">Select Job Mode*</option>
                        <option value="FTE">FTE</option>
                        <option value="Contract">Contract</option>
                        <option value="C2H">C2H</option>
                      </Form.Select>
                      </Col>
                      <Col xs={6}>
                      <Form.Select
                        {...formik.getFieldProps('Mode')}
                        required
                      >
                        <option value="">Mode of Work*</option>
                        <option value="Work from home">Work from Home</option>
                        <option value="Work from office">Work from Office</option>
                        <option value="Hybrid">Hybrid</option>
                      </Form.Select>
                      </Col>
                    </Row>         
                    <br/>
                    <Row>
                         <Col xs={6}>
                         <Form.Control
                        {...formik.getFieldProps('Job_Des')}
                        as="textarea"
                        placeholder="Job Description*"
                        className="w-100 mb-2"
                        style={{ height: '150px' }}
                    />
                      </Col>
                      <Col xs={2}>
                      <Form.Label>Upload Job Description:</Form.Label>
                      </Col>
                      <Col xs={4}>
                      <Form.Control
                          onChange={onUpload}
                          type="file"
                          id="Upload_resume"
                          name="Upload_resume"
                        />
                      </Col>
                    </Row>
                    
                    <Button type="submit" variant='info' className="custom-button">
                      Update
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Col>
    </Row>
 {/* Modal to display posted details */}
 <Modal show={showModal} onHide={hideModal}>
 <Modal.Header closeButton>
   <Modal.Title>Posted Details</Modal.Title>
 </Modal.Header>
 <Modal.Body>
          {ticketNumber && (
            <div>
              <strong>Ticket Number: {ticketNumber}</strong>
            </div>
          )}      
          {postedDetails && (
            <div>
              <Row>
                <Col>
                <p>Client Name: {postedDetails.Client_Name}</p>
                </Col>
              </Row>
              <Row>
                <Col>
                <p>Yre_of_exp: {postedDetails.Yre_of_exp}</p>
                </Col>
                <Col>
                <p>Open_position: {postedDetails.Open_position}</p>
                </Col>
              </Row>
              <Row>
                <Col>
                <p>Budget : {postedDetails.Budget}</p>
                </Col>
                <Col>
                <p>Tech_stack : {postedDetails.Tech_stack}</p>
                </Col>
              </Row>
              <Row>
                <Col>
                <p>status : {postedDetails.status}</p>
                </Col>
                <Col>
                <p>Location : {postedDetails.Location}</p>
                </Col>
              </Row>   
            </div>
          )}
       
        </Modal.Body>
 <Modal.Footer>
   <Button variant="secondary" onClick={hideModal}>
     Close
   </Button>
 </Modal.Footer>
</Modal>
  </Container>
  );
};

export default Adminposts;

