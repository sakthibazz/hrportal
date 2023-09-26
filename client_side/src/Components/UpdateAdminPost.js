import React, { useState, useEffect} from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { updateAdminpostById, getAdmindetailsById,deleteAdminpostById} from '../helper/Helper';
import { useParams, useNavigate } from 'react-router-dom';
import convertToBase64 from '../helper/Convert';
import Loader from './Loader';
import Multiselect from 'multiselect-react-dropdown';

const UpdatePost = () => {
  const [file, setFile] = useState();
  const { userId } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 

 
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getAdmindetailsById(userId);
        setUserData(response);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const formik = useFormik({
    initialValues: userData || {
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
        status:'',
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values, { resetForm }) => {
      values.Job_Description = file || null;

      const updatePromise = updateAdminpostById(userData._id, values);

      try {
        toast.promise(
          updatePromise,
          {
            loading: 'Updating...',
            success: () => {
              navigate('/searchadminpost');
              return 'User details updated successfully!';
            },
            error: (error) => {
              console.error('Frontend Error:', error);

              if (error.response?.status === 409) {
                return 'User with the same data already exists.';
              } else {
                return 'Failed to update user details.';
              }
            },
          }
        );
      } catch (error) {
        console.error('Frontend Error:', error);
        toast.error('An error occurred during update.');
      }
    },
    enableReinitialize: true,
  });

  const onUpload = async (e) => {
    const uploadedFile = e.target.files[0];

    if (uploadedFile) {
      // Ensure the uploaded file is a valid PDF or other supported file types
      if (uploadedFile.type === 'application/pdf') {
        const Resume_Upload = await convertToBase64(uploadedFile);
        setFile(Resume_Upload);
      } else {
        toast.error('Please upload a valid PDF or image file.');
      }
    }
  };

  
  if (isLoading) {
    return (
     <Loader/>
    );
  }


  const onDelete = async () => {
    // Show a confirmation alert before deleting the post
    const confirmed = window.confirm('Are you sure you want to delete this ticket?');
    if (!confirmed) {
      return; // If the user clicks "Cancel", do nothing
    }

    try {
      await deleteAdminpostById(userData._id);
      toast.success('Recruitment post deleted successfully!');
      navigate('/searchadminpost');
    } catch (error) {
      console.error('Error deleting recruitment post:', error);
      toast.error('Failed to delete recruitment post.');
    }
  };

  const onTechStackSelect = (selectedList) => {
    // Ensure selectedList is an array
    if (Array.isArray(selectedList)) {
      formik.setFieldValue('Tech_stack', selectedList);
    }
  };
   const onModeSelect = (selectedList) => {
    // Ensure selectedList is an array
    if (Array.isArray(selectedList)) {
      formik.setFieldValue('Mode', selectedList);
    }
  };
   const onJobModeSelect = (selectedList) => {
    // Ensure selectedList is an array
    if (Array.isArray(selectedList)) {
      formik.setFieldValue('Job_Mode', selectedList);
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
  { id: '70', name: 'Mongoose' },
  { id: '71', name: 'Sequelize' },
  { id: '72', name: 'Express' },
  { id: '74', name: 'CSS' },
];

const jobModeOptions = [
  { id: '1', name: 'FTE' },
  { id: '2', name: 'Contract' },
  { id: '3', name: 'C2H' },
];

const modeOptions = [
  { id: '1', name: 'Work from Home' },
  { id: '2', name: 'Work from Office' },
  { id: '3', name: 'Hybrid' },
];

  return (
    <Container fluid className="p-5">
    <Toaster position="top-center" reverseOrder={false}></Toaster>
   
    <Row>
     
      <Col xs={12} md={12} lg={12}  >
        <Container fluid className="vh-100  align-items-center justify-content-center">
          <Row className="justify-content-center">
            <Col xs={10} md={8} lg={10} className="text-center py-4">
              <Card className="title py-4 mt-30">
              <Card.Header className='pt-30'>
                    <h4 className="text-5xl font-bold">Update Candidate Profile..!</h4>
                    <span className="py-4 text-xl w-2/3 text-center text-muted">
                      Happy to join you!
                    </span>
                  </Card.Header>
                <Card.Body>
                <Form onSubmit={formik.handleSubmit} className='pt-4'>
                  <Row>
                    <Col xs={5}>
                  <h2 className="header-title font-bold mb-3">Ticket Number: {userData.Ticket_no}</h2>
                  </Col>
                  <Col xs={7}>
                  <h4 className="header-title font-bold mb-3">
                          Last Update:{userData.userupdate?.lastupdate.toUpperCase() || 'N/A'}
                        </h4>
                        {userData.userupdate?.updatedFields && (
                          <div>
                            <ul>
                              {Object.keys(userData.userupdate.updatedFields).map(field => (
                                <h4 className="header-title font-bold" key={field}>Updated Fields:{field}</h4>
                              ))}
                            </ul>
                          </div>
                        )}
                  </Col>
                  </Row>
                  <Row>
                    <Col xs={3}>
                      <label>Status:</label>
                      </Col>
                      <Col xs={3}>
                    <Form.Select
                        {...formik.getFieldProps('status')}
                        required
                      >  
                        <option value="">status*</option>
                        <option value="Open">Open</option>
                        <option value="Interviewing">Interviewing</option>
                        <option value="Sourcing">Sourcing</option>
                        <option value="Customer Closed">Customer Closed</option>
                        <option value="Closed">Closed</option>
                      </Form.Select>
                    </Col>
                    </Row>
                    <br/>
                    <Row>
                      <Col xs={3}>
                        <label>Client Name:</label>
                      </Col>
                      <Col xs={3}>
                        <Form.Control
                          {...formik.getFieldProps('Client_Name')}
                          type="text"
                          placeholder="Client Name*"
                          className="w-100 mb-2"
                          required
                        />
                      </Col>
                      <Col xs={3}>
                        <label>Open position:</label>
                      </Col>
                      <Col xs={3}>
                        <Form.Control
                          {...formik.getFieldProps('Open_position')}
                          type="number"
                          placeholder="Open position*"
                          className="w-100 mb-2"
                          required
                        />
                      </Col>
                    </Row>
                    <Row>
                    <Col xs={3}>
                        <label>Year of Experience:</label>
                      </Col>
                      <Col xs={3}>
                        <Form.Control
                          {...formik.getFieldProps('Yre_of_exp')}
                          type="text"
                          placeholder="Year of Experience*"
                          className="w-100 mb-2"
                          required
                        />
                      </Col>
                      <Col xs={3}>
                        <label>Tech Stack:</label>
                      </Col>
                      <Col xs={3}>
                      <Form.Control
            as={Multiselect}
            options={techStackOptions} // Use the options with IDs
            selectedValues={formik.values.Tech_stack}
            onSelect={onTechStackSelect}
            displayValue="name"
            placeholder="Job Title*"
            className="w-100 mb-2"
            required
          /> 
                      </Col>
                    </Row>
                    <Row>
                    <Col xs={3}>
                        <label>Budget:</label>
                      </Col>
                      <Col xs={3}>
                        <Form.Control
                          {...formik.getFieldProps('Budget')}
                          type="number"
                          placeholder="Budget*"
                          className="w-100 mb-2"
                          required
                        />
                      </Col>
                      <Col xs={3}>
                        <label>Location:</label>
                      </Col>
                      <Col xs={3}>
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
  <Col xs={3}>
    <Form.Label>Job Mode*</Form.Label>
    </Col>
    <Col xs={3}>
    <Form.Control
      as={Multiselect}
      options={jobModeOptions}
      selectedValues={formik.values.Job_Mode}
      onSelect={onJobModeSelect}
      displayValue="name"
      placeholder="Select Job Mode*"
      className="w-100 mb-2"
      required
    />
  </Col>
  <Col xs={3}>
    <Form.Label>Mode of Work*</Form.Label>
    </Col>
    <Col xs={3}>
    <Form.Control
      as={Multiselect}
      options={modeOptions}
      selectedValues={formik.values.Mode}
      onSelect={onModeSelect}
      displayValue="name"
      placeholder="Select Mode of Work*"
      className="w-100 mb-2"
      required
    />
  </Col>
</Row>  
                    <br/>
                    <Row>
                    <Col xs={3}>
                        <label>Job Description:</label>
                      </Col>
                      <Col xs={3}>
                         <Form.Control
                        {...formik.getFieldProps('Job_Des')}
                        as="textarea"
                        placeholder="Job Description*"
                        className="w-100 mb-2"
                    />

                      </Col>
                      <Col xs={3}>
                      <Form.Label>Upload Job Description:</Form.Label>
                      </Col>
                      <Col xs={3}>
                      <Form.Control
                          onChange={onUpload}
                          type="file"
                          id="Upload_resume"
                          name="Upload_resume"
                        />
                      </Col>
                    </Row>
                    <Row>
                    <Col >
                    <Button type="submit" variant='outline-info' size="lg">
                      Update
                    </Button>
                    </Col>
                    <Col xs={6}>
                    <Button variant='outline-danger' size="lg" onClick={onDelete}>
                      Delete
                    </Button>
                    </Col>
                    </Row>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Col>
    </Row>
  </Container>
  );
};

export default UpdatePost;