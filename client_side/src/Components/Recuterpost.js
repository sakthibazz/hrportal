// import React, { useState,useEffect,useRef } from 'react';
// import {  Container, Row, Col, Form, Button, Card  } from 'react-bootstrap';
// import toast, { Toaster } from 'react-hot-toast';
// import { useFormik } from 'formik';
// import convertPdfToString from '../helper/Convert';
// import { recuterpost,getAdmindetailsById } from '../helper/Helper';
// import {recuterValidate} from '../helper/Validate'
// import { useParams } from 'react-router-dom';


// const Recuterpost = () => {
//   const [file, setFile] = useState();
//   const [userData, setUserData] = useState(null); 
//   const { userId } = useParams();
//   const isMounted = useRef(false); 

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await getAdmindetailsById(userId);
//         setUserData(response);
//       } catch (error) {
//         console.error('Error fetching user details:', error);
//       }
//     };

//     if (isMounted.current) {
//       fetchUserData(); // Fetch data only on updates (not on initial mount)
//     } else {
//       isMounted.current = true;
//     }
//   }, [userId]);
  

//   const formik = useFormik({
//     initialValues: userData || {
//       Ticket_no:  '',
//       CandidateName: '',
//       MobileNumber: '',
//       Email:'',
//       Yre_of_expe: '',
//       Relevent_Yre_of_exp:'',
//       Domain: '',
//       CTC: '',
//       ECTC: '',
//       Current_location: '',
//       Preffered_location: '',
//       Reason_for_change: '',
//       Notice_peried: '',
//       Comment: '',
//       Referral:'',
//       Referral_MobileNumber:'',
//       Status: '',
//       Current_Company:'',
//       Client_feedback:'',
//       Upload_resume: ''
//     },
//     validate: recuterValidate,
//     validateOnBlur: false,
//     validateOnChange: false,
//     onSubmit: async (values, { resetForm }) => {
//       values.Upload_resume = file || '';

//       const recuterpostPromise = recuterpost(values);
//       resetForm();

//       toast.promise(recuterpostPromise, {
//         loading: 'updating...',
//         success: <b>Registered Successfully...!</b>,
//         error: <b>Could Not Register. MobileNumber or email is already exisy</b>
       
//       });
//     }
//   });

//   const onUpload = async (e) => {
//     const uploadedFile = e.target.files[0];
  
//     if (uploadedFile) {
//       // Ensure the uploaded file is a valid PDF or other supported file types
//       if (uploadedFile.type === 'application/pdf' || uploadedFile.type === 'image/jpeg') {
//         const Resume_Upload = await convertPdfToString(uploadedFile);
//         setFile(Resume_Upload);
//       } else {
//         toast.error('Please upload a valid PDF or image file.');
//       }
//     }
//   };

//   return ( 
//    <Container fluid className="p-0">
//     <Toaster position="top-center" reverseOrder={false}></Toaster>
//     <Row>
//       <Col xs={12} md={12} lg={12}  >
//         <Container fluid className="vh-100  align-items-center justify-content-center">
//           <Row className="justify-content-center">
//             <Col xs={10} md={10} lg={10} sm={12} className="text-center py-4">
//             <Card className="title py-4 mt-30 pt-5">
//               <Card.Header className='pt-30'>
//                     <h4 className="text-5xl font-bold">Update Candidate Profile..!</h4>
//                     <span className="py-4 text-xl w-2/3 text-center text-muted">
//                       Happy to join you!
//                     </span>
//                   </Card.Header>
//                 <Card.Body>
//                  <Form onSubmit={formik.handleSubmit} className='pt-4'>
//                   <Row>
//                     <Col xs={2}>
//                        <label>Ticket No:</label>
//                      </Col>
//                     <Col xs={3}>                    <Form.Control
//                         {...formik.getFieldProps("Ticket_no")}
//                         type="number"
//                         placeholder="Ticket_no*"
//                         className="w-100 mb-2"
//                         disabled
//                       />
//                     </Col>
//                   </Row>
//                     <Row>
//                       <Col xs={6}>
//                         <Form.Control
//                           {...formik.getFieldProps('CandidateName')}
//                           type="text"
//                           placeholder="Candidate Name*"
//                           className="w-100 mb-2"
//                           required
//                         />
//                       </Col>
//                       <Col xs={6}>
//                         <Form.Control
//                           {...formik.getFieldProps('MobileNumber')}
//                           type="tel"
//                           placeholder="Mobile Number*"
//                           className="w-100 mb-2"
//                           required
//                         />
//                       </Col>
//                     </Row>
//                     <Row>
//                       <Col xs={6}>
//                         <Form.Control
//                           {...formik.getFieldProps('Email')}
//                           type="email"
//                           placeholder="Email*"
//                           className="w-100 mb-2"
//                           required
//                         />
//                       </Col>
//                       <Col xs={6}>
//                       <Form.Control
//                           {...formik.getFieldProps('Domain')}
//                           list="Domain"
//                           placeholder="Domain*"
//                           className="w-100 mb-2"
//                           required
//                         />
//                         <datalist id="Domain">
//                           <option>DotNet</option>
//                           <option>SAP</option>
//                           <option>Data Engineering</option>
//                           <option>Power BI</option>
//                           <option>DB Developer</option>
//                           <option>Data Scientist</option>
//                           <option>Testing(Manual testing)</option>
//                           <option>Testing(Automation testing)</option>
//                           <option>Web Full Stack</option>
//                           <option>Dot Net Full Stack</option>
//                           <option>Java Full Stack</option>
//                         </datalist>
//                       </Col>
//                     </Row>
//                     <Row>
//                       <Col xs={6}>
//                         <Form.Control
//                           {...formik.getFieldProps('CTC')}
//                           type="number"
//                           placeholder="CTC*"
//                           className="w-100 mb-2"
//                           required
//                         />
//                       </Col>
//                       <Col xs={6}>
//                         <Form.Control
//                           {...formik.getFieldProps('ECTC')}
//                           type="number"
//                           placeholder="ECTC*"
//                           className="w-100 mb-2"
//                           required
//                         />
//                       </Col>
//                     </Row>
//                     <Row>
//                       <Col xs={6}>
//                         <Form.Control
//                           {...formik.getFieldProps('Yre_of_expe')}
//                           type="number"
//                           placeholder="Year Of Experience*"
//                           className="w-100 mb-2"
//                           required
//                         />
//                       </Col>
//                       <Col xs={6}>
//                         <Form.Control
//                           {...formik.getFieldProps('Relevent_Yre_of_exp')}
//                           type="number"
//                           placeholder="Relevant Year Of Experience*"
//                           className="w-100 mb-2"
//                           required
//                         />
//                       </Col>
//                     </Row>
//                     <Row>
//                       <Col xs={6}>
//                         <Form.Control
//                           {...formik.getFieldProps('Current_location')}
//                           type="text"
//                           placeholder="Current location"
//                           className="w-100 mb-2"
//                         />
//                       </Col>
//                       <Col xs={6}>
//                         <Form.Control
//                           {...formik.getFieldProps('Preffered_location')}
//                           type="text"
//                           placeholder="Preferred location"
//                           className="w-100 mb-2"
//                         />
//                       </Col>
//                     </Row>
//                     <Row>
//                       <Col xs={6}>
//                       <Form.Control
//                           {...formik.getFieldProps('Notice_peried')}
//                           list="data"
//                           placeholder="Notice period*"
//                           className="w-100 mb-2"
//                           required
//                         />
//                         <datalist id="data">
//                           <option>one month</option>
//                           <option>two months</option>
//                           <option>three months</option>
//                           <option>four months</option>
//                         </datalist>
//                       </Col>
//                       <Col xs={6}>
//                       <Form.Control
//                           {...formik.getFieldProps('Current_Company')}
//                           list="Current_Company"
//                           placeholder="Current Company"
//                           className="w-100 mb-2"
                          
//                         />
//                         <datalist id="Current_Company">
//                           <option>Aroha Technologies</option>
//                           <option>TCS</option>
//                           <option>WIBRO</option>
//                           <option>infosis</option>
//                         </datalist>
//                       </Col>
//                     </Row>

//                     <Row>
//                       <Col xs={6}>
//                       <Form.Control
//                           {...formik.getFieldProps('Referral')}
//                           type="text"
//                           placeholder="Referral"
//                           className="w-100 mb-2"
//                         />
//                       </Col>
//                       <Col xs={6}>
//                         <Form.Control
//                           {...formik.getFieldProps('Referral_MobileNumber')}
//                           type="tel"
//                           placeholder="Referral MobileNumber"
//                           className="w-100 mb-2"
//                         />
//                       </Col>
//                     </Row>

//                     <Row>
//                       <Col xs={6}>
//                         <Form.Control
//                           {...formik.getFieldProps('Status')}
//                           list="datas"
//                           placeholder="Status"
//                           className="w-100 mb-2"
//                         />
//                            <datalist id='datas'>
//                           <option>Selected</option>
//                           <option>Scheduled</option>
//                           <option>Rejected</option>
//                           <option>Yet to Scheduled</option>
//                           <option>Re-Scheduled</option>
//                           <option>Yet to Receive feedback</option>
//                         </datalist>
//                       </Col>
//                       <Col xs={6}>
                        
//                         <Form.Control
//                           {...formik.getFieldProps('Comment')}
//                           type="text"
//                           placeholder="Comment"
//                           className="w-100 mb-2"
//                         />
//                       </Col>
//                     </Row>
//                     <Row>
//                          <Col xs={6}>
//                         <Form.Control
//                           {...formik.getFieldProps('Client_feedback')}
//                           type="text"
//                           placeholder="Client feedback"
//                           className="w-100 mb-2"
//                         />
//                       </Col>
//                       <Col xs={2}>
//                       <Form.Label>Upload Resume:</Form.Label>
//                       </Col>
//                       <Col xs={4}>
//                       <Form.Control
//                           onChange={onUpload}
//                           type="file"
//                           id="Upload_resume"
//                           name="Upload_resume"
//                           placeholder='Ulpoad resume'
                          
//                         />
//                       </Col>
//                     </Row>
//                     <Button type="submit" className="btn btn-success custom-button">
//                       Update
//                     </Button>
//                   </Form>
//                 </Card.Body>
//               </Card>
//             </Col>
//           </Row>
//         </Container>
//       </Col>
//     </Row>
//   </Container>
//   );
// };

// export default Recuterpost;


import React, { useState, useEffect,useRef } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { recuterpost, getAdmindetailsById } from '../helper/Helper';
import {recuterValidate} from '../helper/Validate'
import { useParams } from 'react-router-dom';
import convertPdfToString from '../helper/Convert';

const UpdatePost = () => { 
  const [file, setFile] = useState();
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);

  const isMounted = useRef(false); // Create a ref to track component mount status

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getAdmindetailsById(userId);
        setUserData(response);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    if (isMounted.current) {
      fetchUserData(); // Fetch data only on updates (not on initial mount)
    } else {
      isMounted.current = true;
    }
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
      values.Upload_resume = file || '';

      const recuterpostPromise = recuterpost(values);
      resetForm();

      toast.promise(recuterpostPromise, {
        loading: 'updating...',
        success: <b>Registered Successfully...!</b>,
        error: <b>Could Not Register. MobileNumber or email is already exisy</b>
       
      });
    },
    enableReinitialize: true, // Set this option to update form values when userData changes
  });

  const onUpload = async (e) => {
    // Convert PDF file to string (you need to implement the 'convertPdfToString' function)
    // For this example, the 'convertPdfToString' function should be defined separately.
    const Resume_Upload = await convertPdfToString(e.target.files[0]);
    setFile(Resume_Upload);
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <Container fluid className="p-0">
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
                       <label>Ticket No:</label>
                     </Col>
                    <Col xs={3}>                    <Form.Control
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
                      <Form.Control
                          {...formik.getFieldProps('Domain')}
                          list="Domain"
                          placeholder="Domain*"
                          className="w-100 mb-2"
                          required
                        />
                        <datalist id="Domain">
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
                        <Form.Control
                          {...formik.getFieldProps('Yre_of_expe')}
                          type="number"
                          placeholder="Year Of Experience*"
                          className="w-100 mb-2"
                          required
                        />
                      </Col>
                      <Col xs={6}>
                        <Form.Control
                          {...formik.getFieldProps('Relevent_Yre_of_exp')}
                          type="number"
                          placeholder="Relevant Year Of Experience*"
                          className="w-100 mb-2"
                          required
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={6}>
                        <Form.Control
                          {...formik.getFieldProps('Current_location')}
                          type="text"
                          placeholder="Current location"
                          className="w-100 mb-2"
                        />
                      </Col>
                      <Col xs={6}>
                        <Form.Control
                          {...formik.getFieldProps('Preffered_location')}
                          type="text"
                          placeholder="Preferred location"
                          className="w-100 mb-2"
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