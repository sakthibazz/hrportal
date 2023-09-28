import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { recuterpost, getAdmindetailsById } from '../helper/Helper';
import { recuterValidate } from '../helper/Validate';
import { useParams } from 'react-router-dom';
import convertToBase64 from '../helper/Convert';
import Loader from './Loader';
import Select from 'react-select';
import { techStackOptions,customStyles,indianStateswithmetropolitanCities } from '../helper/Option';
import ReactSelect from 'react-select'; 

const UpdatePost = () => {
  const [file, setFile] = useState();
  const { userId } = useParams();
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

    fetchUserData(); // Fetch data on every update

  }, [userId]);

  const formik = useFormik({
    initialValues: {
      Ticket_no: userData ? userData.Ticket_no : '',
      CandidateName: '',
      MobileNumber: '',
      Email:'',
      Yre_of_expe: '',
      Relevent_Yre_of_exp:'',
      Domain: '',
      CTC: '',
      ECTC: '',
      Current_location: '',
      Preffered_location: '',
      Reason_for_change: '',
      Notice_peried: '',
      Comment: '',
      Referral:'',
      Referral_MobileNumber:'',
      Status: '',
      Current_Company:'',
      Client_feedback:'',
      Upload_resume: ''
    },
    validate: recuterValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values, { resetForm }) => {
      values.Upload_resume = file || null; // Set to null if no file is selected

      const recuterpostPromise = recuterpost(values);

      try {
        toast.promise(
          recuterpostPromise,
          {
            loading: 'Registering...',
            success: () => {
              resetForm();
              return 'Registered Successfully...!';
            },
            error: (error) => {
              console.log('Frontend Error:', error);
              if (error.includes('Candidate with the same Email or MobileNumber already exists')) {
                return 'Candidate with the same Email or MobileNumber already';
              } else {
                return 'Could Not Register. ' + error;
              }
            },
          }
        );
      } catch (error) {
        console.log('Frontend Error:', error);
        toast.error('An error occurred during registration.');
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
        formik.setErrors(recuterValidate(formik.values, Resume_Upload)); // Validate with updated file
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

  return (
    <Container fluid className="pt-5">
    <Toaster position="top-center" reverseOrder={false}></Toaster>
    <Row>
      <Col xs={12} md={12} lg={12}  >
        <Container fluid className="vh-100  align-items-center justify-content-center">
          <Row className="justify-content-center">
            <Col xs={10} md={10} lg={10} sm={12} className="text-center py-4">
            <Card className="title py-4 mt-30 pt-5">
              <Card.Header className='pt-30'>
                    <h4 className="text-5xl font-bold">Update Candidate Profile..!</h4>
                    <span className="py-4 text-xl w-2/3 text-center text-muted">
                      Happy to join you!
                    </span>
                  </Card.Header>
                <Card.Body>
                 <Form onSubmit={formik.handleSubmit} className='pt-4'>
                  <Row>
                    <Col xs={2}>
                       <label>Req.No:</label>
                     </Col>
                    <Col xs={3}>                   
                     <Form.Control
                        {...formik.getFieldProps("Ticket_no")}
                        type="number"
                        placeholder="Ticket_no*"
                        className="w-100 mb-2"
                        disabled
                      />
                    </Col>
                  </Row>
                    <Row>
                      <Col xs={6}>
                        <Form.Control
                          {...formik.getFieldProps('CandidateName')}
                          type="text"
                          placeholder="Candidate Name*"
                          className="w-100 mb-2"
                          required
                        />
                      </Col>
                      <Col xs={6}>
                        <Form.Control
                          {...formik.getFieldProps('MobileNumber')}
                          type="tel"
                          placeholder="Mobile Number*"
                          className="w-100 mb-2"
                          required
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={6}>
                        <Form.Control
                          {...formik.getFieldProps('Email')}
                          type="email"
                          placeholder="Email*"
                          className="w-100 mb-2"
                          required
                        />
                      </Col>
                      <Col xs={6}>
                      <Select
                            options={techStackOptions}
                            isMulti
                            value={formik.values.Domain} // Set the value prop to the selected options
                            onChange={(selectedOptions) => {
                              formik.setFieldValue('Domain', selectedOptions);
                            }}
                            placeholder="Domain*"
                            className="w-100 mb-2"
                            styles={customStyles} 
                            required
                          />  
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={6}>
                        <Form.Control
                          {...formik.getFieldProps('CTC')}
                          type="number"
                          placeholder="CTC*"
                          className="w-100 mb-2"
                          required
                        />
                      </Col>
                      <Col xs={6}>
                        <Form.Control
                          {...formik.getFieldProps('ECTC')}
                          type="number"
                          placeholder="ECTC*"
                          className="w-100 mb-2"
                          required
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={6}>                                   
                        <ReactSelect
                          name="Yre_of_expe" // Add a name property
                          value={formik.values.Yre_of_expe} // Set the value prop
                          options={Array.from({ length: 50 }, (_, index) => ({
                            value: index + 1,
                            label: (index + 1).toString(),
                          }))}
                          onChange={(selectedOption) => {
                            formik.setFieldValue('Yre_of_expe', selectedOption); // Update the field value
                          }}
                          styles={customStyles}
                          isSearchable={true} 
                          placeholder="Select Years of Experience"
                          required
                        />
                      </Col>
                      <Col xs={6}>        
                      <ReactSelect
                        name="Relevent_Yre_of_exp" // Add a name property
                        value={formik.values.Relevent_Yre_of_exp} // Set the value prop
                        options={Array.from({ length: 50 }, (_, index) => ({
                          value: index + 1,
                          label: (index + 1).toString(),
                        }))}
                        onChange={(selectedOptions) => {
                          formik.setFieldValue('Relevent_Yre_of_exp', selectedOptions); // Update the field value
                        }}
                        styles={customStyles}
                        isSearchable={true} 
                        placeholder="Select Relevant Years of Experience"
                        required
                      />
                      </Col>
                     
                    </Row>
                    <br/>
                    <Row>
                    <Col xs={6}>
                    <Select
                        options={indianStateswithmetropolitanCities}
                        value={formik.values.Current_location} // Set the value prop to the selected option
                        onChange={(selectedOption) => {
                          formik.setFieldValue('Current_location', selectedOption);
                        }}
                        placeholder="Current Location*"
                        className="w-100 mb-2"
                        styles={customStyles}
                        isSearchable={true} 
                      
                      />
                      </Col>
                      <Col xs={6}>
                      <Select
                        options={indianStateswithmetropolitanCities}
                        value={formik.values.Preffered_location} // Set the value prop to the selected option
                        onChange={(selectedOption) => {
                          formik.setFieldValue('Preffered_location', selectedOption);
                        }}
                        placeholder="Preffered Location*"
                        className="w-100 mb-2"
                        styles={customStyles}
                        isSearchable={true} 
                      
                      />
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={6}>
                      <Form.Control
                          {...formik.getFieldProps('Notice_peried')}
                          list="data"
                          placeholder="Notice period*"
                          className="w-100 mb-2"
                          required
                        />
                        <datalist id="data">
                          <option>one month</option>
                          <option>two months</option>
                          <option>three months</option>
                          <option>four months</option>
                        </datalist>
                      </Col>
                      <Col xs={6}>
                      <Form.Control
                          {...formik.getFieldProps('Current_Company')}
                          list="Current_Company"
                          placeholder="Current Company"
                          className="w-100 mb-2"
                          
                        />
                        <datalist id="Current_Company">
                          <option>Aroha Technologies</option>
                          <option>TCS</option>
                          <option>WIBRO</option>
                          <option>infosis</option>
                        </datalist>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={6}>
                      <Form.Control
                          {...formik.getFieldProps('Referral')}
                          type="text"
                          placeholder="Referral"
                          className="w-100 mb-2"
                        />
                      </Col>
                      <Col xs={6}>
                        <Form.Control
                          {...formik.getFieldProps('Referral_MobileNumber')}
                          type="tel"
                          placeholder="Referral MobileNumber"
                          className="w-100 mb-2"
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={6}>
                        <Form.Control
                          {...formik.getFieldProps('Status')}
                          list="datas"
                          placeholder="Status"
                          className="w-100 mb-2"
                        />
                           <datalist id='datas'>
                          <option>Selected</option>
                          <option>Scheduled</option>
                          <option>Rejected</option>
                          <option>Yet to Scheduled</option>
                          <option>Re-Scheduled</option>
                          <option>Yet to Receive feedback</option>
                        </datalist>
                      </Col>
                      <Col xs={6}>
                        
                        <Form.Control
                          {...formik.getFieldProps('Comment')}
                          type="text"
                          placeholder="Comment"
                          className="w-100 mb-2"
                        />
                      </Col>
                    </Row>
                    <Row>
                         <Col xs={6}>
                        <Form.Control
                          {...formik.getFieldProps('Client_feedback')}
                          type="text"
                          placeholder="Client feedback"
                          className="w-100 mb-2"
                        />
                      </Col>
                      <Col xs={2}>
                      <Form.Label>Upload Resume:</Form.Label>
                      </Col>
                      <Col xs={4}>
                      <Form.Control
                          onChange={onUpload}
                          type="file"
                          id="Upload_resume"
                          name="Upload_resume"
                          placeholder='Ulpoad resume'
                          
                        />
                      </Col>
                    </Row>
                    <Button type="submit" className="btn btn-success custom-button">
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
  </Container>
  );
};

export default UpdatePost;