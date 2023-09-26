import toast from 'react-hot-toast'
import { authenticate,recuterpost } from './Helper';

// validate loginpage username
export async function usernamevaldate(values){
    const errors=UsernameVerify({},values);

    if(values.username){
        // checck user exist or not
        const {status}=await authenticate(values.username);
        if(status !==200){
            errors.exit=toast.error('User does not exist..!')
        }
    }
    return errors;
}
// valdate passsword
export async function passwordValidate(values){
    const errors = passwordVerify({}, values);

    return errors;
}

// validate Reset password
export async function resetPasswordValidation(values){
    const errors = passwordVerify({}, values);
    if(values.password!==values.Confirm_pwt){
        errors.exit=toast.error("password not match...!")
    }
    return errors
}

// validate register Form
export async function registervalidation(values){
    const errors=UsernameVerify({},values);
    passwordVerify(errors,values);
    emailVerify(errors,values);

    return errors

}

// validate profile page
export async function profileValidation(values){
    const errors = emailVerify({}, values);
    return errors;
}
// ********************************************--*******************//



//validate password
function passwordVerify(errors = {}, values){
    /* eslint-disable no-useless-escape */
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if(!values.password){
        errors.password = toast.error("Password Required...!");
    } else if(values.password.includes(" ")){
        errors.password = toast.error("Wrong Password...!");
    }else if(values.password.length < 4){
        errors.password = toast.error("Password must be more than 4 characters long");
    }else if(!specialChars.test(values.password)){
        errors.password = toast.error("Password must have special character");
    }

    return errors;
}




//validate Username
function UsernameVerify(error={},values){
    if(!values.username){
        error.username=toast.error("UserName Required...!")
    }else if(values.username.includes(" ")){
        error.username=toast.error('Invald Username')
    }
    return error;
}

// validate email
function emailVerify(error={},values){
    if(!values.email){
        error.email=toast.error("Email required")
    }else if(values.email.includes(" ")){
        error.email=toast.error("Wrong email..!")
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        error.email = toast.error("Invalid email address...!")
    }

    return error;
}

// recuter validate
export async function recuterValidate(values,file) {
    const errors = {};
    const mobileNumberPattern = /^(\+91)?\s*\d{10}$/;
  
   if (values.username) {
      // Check if user exists
      const response = await recuterpost(values); 
      if (response.error) {
        errors.exit = toast.error("User already exist..!");
      }
    }if(!values.CandidateName){
        errors.exit=toast.error("CandidateName Required..!")
    }else if (values.CandidateName.trim() === "") {
        errors.CandidateName = "Candidate Name should not be empty";
        toast.error(errors.CandidateName);
      }    
      if (!values.MobileNumber) {
        errors.MobileNumber = toast.error("MobileNumber Required..!");
      } else {
        // Remove any spaces from the mobile number
        values.MobileNumber = values.MobileNumber.replace(/\s/g, '');
    
        if (!mobileNumberPattern.test(values.MobileNumber)) {
          errors.MobileNumber = "Invalid mobile number. Please enter a 12-digit number with optional +91 country pincode and without spaces.";
          toast.error(errors.MobileNumber);
        }
      }
    if(!values.Yre_of_expe){
        errors.exit=toast.error("Yre_of_exp Required..!")
    }else if(isNaN(values.Yre_of_expe)){
        errors.exit=toast.error("Invalid Yre_of_exp")
    }
    if(!values.Relevent_Yre_of_exp){
        errors.exit=toast.error("Relevent_Yre_of_exp Required..!")
    }else if(isNaN(values.Relevent_Yre_of_exp)){
        errors.exit=toast.error("Invalid Relevent_Yre_of_exp")
    }
    if(!values.Domain){
        errors.exit=toast.error("Domain Required..!")
    }else if(!values.Domain.trim()===""){
        errors.exit=toast.error("Invalid Domain name")
    }
    if(!values.CTC){
        errors.exit=toast.error("CTC Required..!")
    }else if(isNaN(values.CTC)){
        errors.exit=toast.error("Invalid CTC")
    }
    if(!values.ECTC){
        errors.exit=toast.error("ECTC Required..!")
    }else if(isNaN(values.ECTC)){
        errors.exit=toast.error("Invalid ECTC")
    }
    if (!values.Email) {
        errors.Email = "Email is required";
        toast.error(errors.Email);
      } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(values.Email)) {
        errors.Email = "Invalid Email address";
        toast.error(errors.Email);
      }
      
    return errors;
  }
  
  export async function adminPostValidate(values,file) {
    const errors = {};
  
    if (!values.Client_Name.trim()) {
      errors.exit =toast.error("Client Name is required");
    }
  
    if (!values.Yre_of_exp.trim()) {
        errors.exit =toast.error("Year of Experience is required");
    }
    if (!values.Tech_stack || values.Tech_stack.length === 0) {
        errors.Tech_stack = 'Please select at least one Tech Stack';
      }
    if (!values.Location.trim()) {
        errors.exit =toast.error("Location is required");
    }
  
    if (!values.Mode || values.Mode.length === 0) {
        errors.exit =toast.error("Mode Of Work is required");
    }  
    return errors;
  }