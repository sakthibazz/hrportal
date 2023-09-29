import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button} from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { updateAdminpostById, getAdmindetailsById, deleteAdminpostById } from '../helper/Helper';
import { useParams, useNavigate } from 'react-router-dom';
import convertToBase64 from '../helper/Convert';
import Loader from './Loader';
import Select from 'react-select';
import { techStackOptions, jobModeOptions, modeOptions,customStyles } from '../helper/Option';
import './FontText.css';

const UpdatePost = () => {
  const [file, setFile] = useState(null);
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
      Job_Mode: [],
      Mode: [],
      status: '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values.Job_Description = file || null;

      const updatePromise = updateAdminpostById(userData._id, values);

      try {
        await toast.promise(
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
    return <Loader />;
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



  return (
    <Container >
      <Toaster position="top-center" reverseOrder={false}></Toaster>
    <Row>
    <Col xs={12} md={12} lg={12} className="text-center py-4">
      <h4 className="text-5xl font-bold">Update Client Requirements..!</h4>
      <span className="py-4 text-xl w-2/3 text-center text-muted"></span>
    </Col>
    <Col xs={12} md={12} lg={12}>
      <Form onSubmit={formik.handleSubmit} className="pt-4">
        <Row>
          <Col xs={6} md={6} lg={6}>
            <h2 className="header-title font-bold mb-3">Ticket Number: {userData.Ticket_no}</h2>
          </Col>
          <Col xs={6} md={6} lg={6}>
            <h4 className="header-title font-bold mb-3">
              Last Update: {userData.userupdate?.lastupdate.toUpperCase() || 'N/A'}
            </h4>
            {userData.userupdate?.updatedFields && (
              <div>
                <ul>
                  {Object.keys(userData.userupdate.updatedFields).map((field) => (
                    <h4 className="header-title font-bold" key={field}>
                      Updated Fields: {field}
                    </h4>
                  ))}
                </ul>
              </div>
            )}
          </Col>
        </Row>
        <Row>
          <Col xs={3} md={3} lg={3}>
            <label className="bold-text">Status:</label>
          </Col>
          <Col xs={3} md={3} lg={3}>
            <Form.Select {...formik.getFieldProps('status')} required>
              <option value="">status*</option>
              <option value="Open">Open</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Sourcing">Sourcing</option>
              <option value="Customer Closed">Customer Closed</option> 
              <option value="Closed">Closed</option>
            </Form.Select>
          </Col>
          <Col xs={3} md={3} lg={3}>
            <label className="bold-text">Client Name:</label>
          </Col>
          <Col xs={3} md={3} lg={3}>
            <Form.Control
              {...formik.getFieldProps('Client_Name')}
              type="text"
              placeholder="Client Name*"
              className="w-100 mb-2"
              required
            />
          </Col>
        </Row>
        <Row>
          <Col xs={3} md={3} lg={3}>
            <label className="bold-text">Open position:</label>
          </Col>
          <Col xs={3} md={3} lg={3}>
            <Form.Control
              {...formik.getFieldProps('Open_position')}
              type="number"
              placeholder="Open position*"
              className="w-100 mb-2"
              required
            /> 
          </Col>
          <Col xs={3} md={3} lg={3}> 
            <label className="bold-text">Year of Experience:</label>
          </Col>
          <Col xs={3} md={3} lg={3}>
            <Form.Control
              {...formik.getFieldProps('Yre_of_exp')}
              type="text"
              placeholder="Year of Experience*"
              className="w-100 mb-2"
              required
            />
          </Col>
        </Row>
        <Row>
          <Col xs={3} md={3} lg={3}>
            <label className="bold-text">Tech Stack:</label>
          </Col>
          <Col xs={9} md={9} lg={9}>
            <Select
              options={techStackOptions}
              isMulti
              value={formik.values.Tech_stack}
              onChange={(selectedOptions) => {
                formik.setFieldValue('Tech_stack', selectedOptions);
              }}
              placeholder="Tech Stack*"
              className="w-100 mb-2"
              required
              styles={customStyles}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={3} md={3} lg={3}>
            <label className="bold-text">Budget:</label>
          </Col>
          <Col xs={3} md={3} lg={3}>
            <Form.Control
              {...formik.getFieldProps('Budget')}
              type="number"
              placeholder="Budget*"
              className="w-100 mb-2"
              required
            />
          </Col>
          <Col xs={3} md={3} lg={3}>
            <label className="bold-text">Location:</label>
          </Col>
          <Col xs={3} md={3} lg={3}>
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
            <Col xs={3} md={3} lg={3}>
            <label className="bold-text">Job Mode:</label>
          </Col>
          <Col xs={9} md={9} lg={9}>
            <Select
              options={jobModeOptions}
              isMulti
              value={formik.values.Job_Mode}
              onChange={(selectedOptions) => {
                formik.setFieldValue('Job_Mode', selectedOptions);
              }}
              placeholder="Job Mode*"
              className="w-100 mb-2"
              styles={customStyles}
              required
            />
          </Col>
        </Row>
        <Row>
        <Col xs={3} md={3} lg={3}>
            <label className="bold-text">Mode:</label>
          </Col>
          <Col xs={9} md={9} lg={9}>
            <Select
              options={modeOptions}
              isMulti
              value={formik.values.Mode}
              onChange={(selectedOptions) => {
                formik.setFieldValue('Mode', selectedOptions);
              }}
              placeholder="Mode*"
              className="w-100 mb-2"
              styles={customStyles}
              required
            />
          </Col>
        </Row>
        <Row>
          <Col xs={3} md={3} lg={3}>
            <label className="bold-text">Job Description:</label>
          </Col>
          <Col xs={9} md={9} lg={9}>
            <Form.Control
              {...formik.getFieldProps('Job_Des')}
              as="textarea"
              placeholder="Job Description*"
              className="w-100 mb-2"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={3} md={3} lg={3}>
            <Form.Label className="bold-text">Upload Job Description:</Form.Label>
          </Col>
          <Col xs={9} md={9} lg={9}>
            <Form.Control onChange={onUpload} type="file" id="Upload_resume" name="Upload_resume" />
          </Col>
        </Row>
        <br/>
        <Row>
          <Col>
            <Button type="submit" variant="outline-info" size="lg">
              Update
            </Button>
          </Col>
          <Col >
            <Button variant="outline-danger" size="lg" onClick={onDelete}>
              Delete
            </Button>
          </Col>
        </Row>
      </Form>
    </Col>
  </Row>
  </Container>
  );
};

export default UpdatePost;