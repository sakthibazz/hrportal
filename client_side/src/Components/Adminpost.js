import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Modal, } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import convertToBase64 from '../helper/Convert';
import { Adminpost } from '../helper/Helper';
import { adminPostValidate } from '../helper/Validate';
import './FontText.css';
import Multiselect from 'multiselect-react-dropdown';

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
      Tech_stack: [],
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

 
  const onTechStackSelect = (selectedList) => {
    // Ensure selectedList is an array
    if (Array.isArray(selectedList)) {
      formik.setFieldValue('Tech_stack', selectedList);
    }
  };
  // Add IDs to your tech stack options
const techStackOptions = [
  { id: '1', name: 'DotNet' },
  { id: '2', name: 'SAP' },
  { id: '3', name: 'Data Engineering' },
  { id: '4', name: 'Power BI' },
  { id: '5', name: 'DB Developer' },
  { id: '6', name: 'Data Scientist' },
  { id: '7', name: 'Testing(Manual testing)' },
  { id: '8', name: 'Testing(Automation testing)' },
  { id: '9', name: 'Web Full Stack' },
  { id: '10', name: 'Dot Net Full Stack' },
  { id: '11', name: 'Java Full Stack' },
  { id: '12', name: 'DevOps' },
  { id: '13', name: 'Cloud Computing' },
  { id: '14', name: 'Cybersecurity' },
  { id: '15', name: 'Network Administration' },
  { id: '16', name: 'Database Administration' },
  { id: '17', name: 'Machine Learning' },
  { id: '18', name: 'Artificial Intelligence' },
  { id: '19', name: 'Front-end Development' },
  { id: '20', name: 'Back-end Development' },
  { id: '21', name: 'Mobile App Development' },
  { id: '22', name: 'UI/UX Design' },
  { id: '23', name: 'Big Data' },
  { id: '24', name: 'Game Development' },
  { id: '25', name: 'Embedded Systems' },
  { id: '26', name: 'Robotics' },
  { id: '27', name: 'Blockchain' },
  { id: '28', name: 'AR/VR Development' },
  { id: '29', name: 'IoT Development' },
  { id: '30', name: 'Software Testing' },
  { id: '31', name: 'E-commerce Development' },
  { id: '32', name: 'Digital Marketing' },
  { id: '33', name: 'System Administration' },
  { id: '34', name: 'Cloud Architecture' },
  { id: '35', name: 'Data Analysis' },
  { id: '36', name: 'IT Support' },
  { id: '37', name: 'Healthcare IT' },
  { id: '38', name: 'Business Analysis' },
  { id: '39', name: 'ERP Systems' },
  { id: '40', name: 'Quality Assurance' },
  { id: '41', name: 'Virtualization' },
  { id: '42', name: 'Web Security' },
  { id: '43', name: 'Linux Administration' },
  { id: '44', name: 'Wireless Networking' },
  { id: '45', name: 'CAD/CAM Design' },
  { id: '46', name: 'Data Warehousing' },
  { id: '47', name: 'GIS Mapping' },
  { id: '48', name: 'Computer Vision' },
  { id: '49', name: 'Bioinformatics' },
  { id: '50', name: 'Natural Language Processing' },
  { id: '51', name: 'Front-end Web Development' },
  { id: '52', name: 'Back-end Web Development' },
  { id: '53', name: 'Full Stack Web Development' },
  { id: '54', name: 'UI/UX Web Design' },
  { id: '55', name: 'Mobile App Development (Web)' },
  { id: '56', name: 'E-commerce Web Development' },
  { id: '57', name: 'Web Security' },
  { id: '58', name: 'Web Content Management' },
  { id: '59', name: 'Web Accessibility' },
  { id: '60', name: 'React.js' },
  { id: '60', name: 'ReactNative' },
  { id: '61', name: 'Angular' },
  { id: '62', name: 'Vue.js' },
  { id: '63', name: 'Ember.js' },
  { id: '64', name: 'Svelte' },
  { id: '65', name: 'Backbone.js' },
  { id: '66', name: 'Node.js' },
  { id: '67', name: 'MongoDB' },
  { id: '68', name: 'MySQL' },
  { id: '69', name: 'PostgreSQL' },
  { id: '69', name: 'SQL' },


  // Add more IT domains as needed
];

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
            as={Multiselect}
            options={techStackOptions} // Use the options with IDs
            selectedValues={formik.values.Tech_stack}
            onSelect={onTechStackSelect}
            displayValue="name"
            placeholder="Job Title*"
            className="w-100 mb-2"
            required
          />        </Col>
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
        <p>Budget: {postedDetails.Budget}</p>
      </Col>
      <Col>
      <td>
  {Array.isArray(postedDetails.Tech_stack) ? (
    postedDetails.Tech_stack.map(tech => tech.name).join(', ')
  ) : (
    postedDetails.Tech_stack || 'Tech Stack Data Missing'
  )}
</td>
      </Col>
    </Row>
    <Row>
      <Col>
        <p>Status: {postedDetails.status}</p>
      </Col>
      <Col>
        <p>Location: {postedDetails.Location}</p>
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


