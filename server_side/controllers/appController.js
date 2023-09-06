import UserModel from "../model/User.model.js";
import bcrypt, { hash } from 'bcrypt';
import jwt from "jsonwebtoken";
import config from "../Router/config.js";
import otpGenerator from 'otp-generator';
import RecuteModule from "../model/Recute.module.js";
import AdminModule from "../model/Admin.module.js";
import DeveloperModel from "../model/Developer.model.js"
import transporter from '../controllers/mailer.js'
import moment from 'moment-timezone';




/** middleware for verify user */
export async function verifyUser(req, res, next){
    try {
        const { username } = req.method === "GET" ? req.query : req.body;
    
        // Check the user existence
        const user = await UserModel.findOne({ username });
        if (!user) {
          return res.status(404).send({ error: "User not found" });
        }
    
        // Attach the user object to the request for further use
        req.user = user;
        next();
      } catch (error) {
        return res.status(500).send({ error: "Authentication Error" });
      }
}


/** POST: http://localhost:8000/api/register 
 * @param : {
  "username" : "example123",
  "password" : "admin123",
  "email": "example@gmail.com",
  "firstName" : "bill",
  "lastName": "william",
  "mobile": 8009860560,
  "address" : "Apt. 556, Kulas Light, Gwenborough",
  "profile": ""
}
*/
export async function register(req, res) {
    try {
      const { username, password, profile, email,position } = req.body;
  
      // check the existing user
      const existUsername = UserModel.findOne({ username }).exec();
      const existEmail = UserModel.findOne({ email }).exec();
  
      Promise.all([existUsername, existEmail])
        .then(([existingUsername, existingEmail]) => {
          if (existingUsername) {
            return res.status(400).send({ error: "Please use a unique username" });
          }
          if (existingEmail) {
            return res.status(400).send({ error: "Please use a unique email" });
          }
          if (password) {
            bcrypt.hash(password, 10)
              .then(hashedPassword => {
                const user = new UserModel({
                  username,
                  password: hashedPassword,
                  profile: profile || '',
                  email,
                  position
                });
  
                user.save()
                  .then(result => res.status(201).send({ msg: "User registered successfully" }))
                  .catch(error => res.status(500).send({ error }));
              })
              .catch(error => {
                console.log(error);
                return res.status(500).send({ error: "Unable to hash password" });
              });
          }
        })
        .catch(error => {
          console.log(error);
          return res.status(500).send({ error });
        });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  }  

// //**
// * @param {
//   "Ticket_no":1,
//   "CandidateName":"abineshwaran",
//   "MobileNumber":9710087209,
//   "Yre_of_exp":3,
//   "Domine":"mechanical"
// } */
export async function recuterpost(req, res) {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ error: 'Authentication failed or user not found' });
    }

    const {
      Ticket_no,
      CandidateName,
      MobileNumber,
      Email,
      Yre_of_expe,
      Relevent_Yre_of_exp,
      Domain,
      CTC,
      ECTC,
      Current_location,
      Preffered_location,
      Reason_for_change,
      Notice_peried,
      Comment,
      Referral,
      Referral_MobileNumber,
      Status,
      Current_Company,
      Client_feedback,
      Upload_resume,
      date
    } = req.body;
    // Check if a candidate with the same Email or MobileNumber already exists for the given Ticket_no
    const existingCandidate = await RecuteModule.findOne({
      $and: [
        { $or: [{ Email }, { MobileNumber }] },
      ],
    });

    if (existingCandidate) {
      return res.status(409).json({ error: 'Candidate with the same Email or MobileNumber already exists' });
    }
    // Fetch the user based on the userId from req.user
    const user = await UserModel.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Extract the username from the user object
    const username = user.username;

    const recuteData = {
      Ticket_no,
      CandidateName,
      MobileNumber,
      Email,
      Yre_of_expe,
      Relevent_Yre_of_exp,
      Domain,
      CTC,
      ECTC,
      Current_location,
      Preffered_location,
      Reason_for_change,
      Notice_peried,
      Comment,
      Status,
      Current_Company,
      Referral,
      Referral_MobileNumber,
      Client_feedback,
      Upload_resume,
      date,
      username, // Add the username to the recuteData object
    };


    // Create a new RecuteModule document with the username included
    const recuteModule = new RecuteModule(recuteData);

    // Save the RecuteModule document to the database
    recuteModule
      .save()
      .then(result => res.status(201).send({ msg: "Recuter posted successfully" }))
      .catch(error => res.status(500).send({ error }));
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

  //post data of admin in thunderclient
  // * @param {
  //   "Ticket_no": "T12345",
  //   "Client_Name": "Example Client",
  //   "Open_position": "Software Engineer",
  //   "Yre_of_exp": "3",
  //   "Tech_stack": "JavaScript, Node.js",
  //   "Budget": "$80000",
  //   "Location": "New York",
  //   "status": "Open",
  //   "Job_Description": "This is a job description.",
  //   "Mode": "Full-Time"
  //} */
export async function Adminpost(req, res) {
    try {
      if (!req.user || !req.user.userId) {
        return res.status(401).json({ error: 'Authentication failed or user not found' });
      }
  
      const {
        Ticket_no,
        Client_Name,
        Open_position,
        Yre_of_exp,
        Tech_stack,
        Budget,
        Location,
        status,
        Job_Description,
        Job_Des,
        Job_Mode,
        Mode,
        
      } = req.body;
  
      // Extract the username from the user object
      const username = req.user.username; // Fixed the issue with user object access
    
      const recuteData = {
        Ticket_no,
        Client_Name,
        Open_position,
        Yre_of_exp,
        Tech_stack,
        Budget,
        Location,
        status,
        Job_Description,
        Job_Des,
        Mode,
        Job_Mode,
        PostedUser: username, // Add the username to the recuteData object
      };
  
      // Create a new AdminModule document with the username included
      const adminModule = new AdminModule(recuteData);
  
      // Save the AdminModule document to the database
      adminModule
      .save()
      .then(result => {
        const email = {
          from: 'arohatechnologies0@gmail.com', // Change to your sender email
          to:'abineshajith81@gmail.com', // Recipient's email, which is the user's email in this case "CHENNAIAroha@gmail.com"
          subject: 'Admin Posting Details', // Subject of the email
          html: `
            <h1>Admin Posting Details</h1>
            <h2>Posted By:${result.PostedUser}</h2>
            <h3>Ticket No: ${result.Ticket_no}</h3>
            <h4>Client Name: ${result.Client_Name}</h4>
            <h5>Open Position: ${result.Open_position}</h5>
            <h6>Year of Experience: ${result.Yre_of_exp}</h6>
            <h6>Tech stack: ${result.Tech_stack}</h6>
            <h6>Budget: ${result.Budget}</h6>
            <h6>Location: ${result.Location}</h6>
            <h6>Mode: ${result.Mode}</h6>
            <h6>Job Mode: ${result.Job_Mode}</h6>
          `,
        };

        // Send the email using the transporter from the imported file
        transporter.sendMail(email, (err, info) => {
          if (err) {
            console.log(err);
            return res.status(500).send({ error: "Failed to send email" });
          } else {
            console.log("Email sent: " + info.response);
            res.status(201).send({ msg: "Admin posted successfully", adminModule: result });
          }
        });
      })
      .catch(error => res.status(500).send({ error }));
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

//update recute post by the means of _id
export async function updateRecuterpostById(req, res) {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ error: 'Authentication failed or user not found' });
    }

    const postId = req.params.id; // Assuming the route parameter is named "id"
    console.log("Post ID from request params:", postId);

    const {
      Ticket_no,
      CandidateName,
      Email,
      Yre_of_expe,
      Relevent_Yre_of_exp,
      Domain,
      CTC,
      ECTC,
      Current_location,
      Preffered_location,
      Reason_for_change,
      Notice_peried,
      Comment,
      Referral,
      Referral_MobileNumber,
      Status,
      Current_Company,
      Client_feedback,
      Upload_resume,
      date,
      MobileNumber // Extract the new mobile number from req.body
    } = req.body;

    // Fetch the user based on the userId from req.user
    const user = await UserModel.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Extract the username from the user object
    const username = user.username;

    // Make sure that the newMobileNumber field is of type Number and not a string
    const mobileNum = Number(MobileNumber);

    // Check if the new mobile number or email already exists within the same ticket number
    const existingRecuterpost = await RecuteModule.findOne({
      Ticket_no,
      $or: [{ Email }, { MobileNumber}],
      _id: { $ne: postId }, // Exclude the current post from the search
    });

    if (existingRecuterpost) {
      return res.status(409).json({
        error: "A record with the same Ticket_no, email, or mobile number already exists.",
      });
    }

    const updatedRecuterpost = await RecuteModule.findByIdAndUpdate(
      postId,
      {
        Ticket_no,
        CandidateName,
        MobileNumber, // Include the new mobile number in the update operation
        Email,
        Yre_of_expe,
        Relevent_Yre_of_exp,
        Domain,
        CTC,
        ECTC,
        Current_location,
        Preffered_location,
        Reason_for_change,
        Notice_peried,
        Comment,
        Referral,
        Referral_MobileNumber,
        Status,
        Current_Company,
        Client_feedback,
        Upload_resume,
        date,
        lastupdate: username
      },
      { new: true } // Return the updated document
    );

    if (!updatedRecuterpost) {
      return res.status(404).json({ error: "Recruitment post not found" });
    }

    return res.status(200).json({ msg: "Recruitment post updated successfully", data: updatedRecuterpost });
  } catch (error) {
    console.error("Error updating recruiter post:", error);
    return res.status(500).json({ error: "Failed to update recruitment post" });
  }
}

export async function deleteAdminpostById(req, res) {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ error: 'Authentication failed or user not found' });
    }

    const postId = req.params.id; // Assuming the route parameter is named "id"

    // Perform the deletion
    const deletedAdminpost = await AdminModule.findByIdAndDelete(postId);

    if (!deletedAdminpost) {
      return res.status(404).json({ error: 'Recruitment post not found' });
    }

    // Return a success message
    return res.status(200).json({ msg: 'Recruitment post deleted successfully',deletedAdminpost });
  } catch (error) {
    console.error('Error deleting recruiter post:', error);
    return res.status(500).json({ error: 'Failed to delete recruitment post' });
  }
}

export async function updateAdminpostById(req, res) {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ error: 'Authentication failed or user not found' });
    }

    const postId = req.params.id; // Assuming the route parameter is named "id"
    console.log("Post ID from request params:", postId);

    const {
      Ticket_no,
      Client_Name,
      Open_position,
      Yre_of_exp,
      Tech_stack,
      Budget,
      Location,
      status,
      Job_Description,
      Job_Des,
      Job_Mode,
      Mode, // Extract the new mobile number from req.body
    } = req.body;
    

    // Fetch the user based on the userId from req.user
    const user = await UserModel.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Extract the username from the user object
    const username = user.username;
   
    // Fetch the existing document
    const existingAdminpost = await AdminModule.findById(postId);

    if (!existingAdminpost) {
      return res.status(404).json({ error: "Recruitment post not found" });
    }

    // Determine if the status is changing
    const isStatusChanging = existingAdminpost.status !== status;

    // Update the document and include the userupdate field with updatedFields
    const currentDate = new Date(); // Get the current date and time
    const updatedFields = {};

    // Function to check if values are different and not null
    const hasChanged = (key, newValue) => {
      return newValue !== null && existingAdminpost[key] !== newValue;
    };

    if (hasChanged('Ticket_no', Ticket_no)) {
      updatedFields.Ticket_no = Ticket_no;
    }
    if (hasChanged('Client_Name', Client_Name)) {
      updatedFields.Client_Name = Client_Name;
    }
    if (hasChanged('Open_position', Open_position)) {
      updatedFields.Open_position = Open_position;
    }
    if (hasChanged('Yre_of_exp', Yre_of_exp)) {
      updatedFields.Yre_of_exp = Yre_of_exp;
    }
    if (hasChanged('Tech_stack', Tech_stack)) {
      updatedFields.Tech_stack = Tech_stack;
    }
    if (hasChanged('Budget', Budget)) {
      updatedFields.Budget = Budget;
    }
    if (hasChanged('Location', Location)) {
      updatedFields.Location = Location;
    }
    if (hasChanged('Job_Description', Job_Description)) {
      updatedFields.Job_Description = Job_Description;
    }
    if (hasChanged('Job_Des', Job_Des)) {
      updatedFields.Job_Des = Job_Des;
    }
    if (hasChanged('Mode', Mode)) {
      updatedFields.Mode = Mode;
    }
    if (hasChanged('Job_Mode', Job_Mode)) {
      updatedFields.Job_Mode = Job_Mode;
    }
    if (hasChanged('Job_Mode', status)) {
      updatedFields.status = status;
    }
    
    const updateData = {
      Ticket_no,
      Client_Name,
      Open_position,
      Yre_of_exp,
      Tech_stack,
      Budget,
      Location,
      status,
      Job_Description,
      Job_Des,
      Mode,
      Job_Mode,
      userupdate: {
        lastupdate: username,
        updatedFields, // Store the updated fields and their values
      },
    };

    if (isStatusChanging) {
      updateData.date = currentDate; // Update the 'date' field with the current date
    } else {
      updateData.date = existingAdminpost.date; // Keep the existing date
    }

    const updatedAdminpost = await AdminModule.findByIdAndUpdate(
      postId, // Find the record with the given _id
      updateData,
      { new: true } // Return the updated document
    );

    if (!updatedAdminpost) {
      return res.status(404).json({ error: "Recruitment post not found" });
    }

    return res.status(200).json({ msg: "Recruitment post updated successfully", data: updatedAdminpost });
  } catch (error) {
    console.error("Error updating recruiter post:", error);
    return res.status(500).json({ error: "Failed to update recruitment post" });
  }
}

/** POST: http://localhost:8080/api/login 
 * @param: { 
  "username" : "example123",
  "password" : "admin123"
}
*/
export async function login(req, res) {
    const { username, password } = req.body;
  
    try {
      UserModel.findOne({ username })
        .then(user => {
          bcrypt.compare(password, user.password)
            .then(passwordCheck => {
              if (!passwordCheck) return res.status(400).send({ error: "Incorrect password" });
  
              // Create JWT token
              const token = jwt.sign(
                { userId: user._id, username: user.username },
                config.JWT_SECRET,
                { expiresIn: "24h" }
              );
              
                     // Get the current IST time in Chennai and format it in 12-hour format
            const loginTimeIST = moment.tz('Asia/Kolkata').format('YYYY-MM-DD hh:mm:ss A'); // 12-hour format

            UserModel.findByIdAndUpdate(
              user._id,
              { $set: { loginTime: loginTimeIST } },
              { new: true }
            ).exec();

              return res.status(200).send({
                msg: "Login Successful",
                username: user.username,
                loginTimeIST,
                token
              });
            })
            .catch(error => {
              return res.status(400).send({ error: "Password does not match" });
            });
        })
        .catch(error => {
          return res.status(404).send({ error: "Username not found" });
        });
    } catch (error) {
      return res.status(500).send({ error });
    }
  }
/** GET: http://localhost:8080/api/user/example123 */
export async function getuser(req, res) {
    const { username } = req.params;
  
    try {
      if (!username) {
        return res.status(400).send({ error: "Invalid username" });
      }
  
      const user = await UserModel.findOne({ username }, "-password");
  
      if (!user) {
        return res.status(404).send({ error: "User not found" });
      }
  
      return res.status(200).send(user);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: "Internal server error" });
    }
  }


// GET method for fetching user details based on any one of the details

export async function getUserDetails(req, res) {
  const {CandidateName, MobileNumber, Domain,Notice_peried,fromDate, toDate } = req.query;

  try {
    // Create a query object to filter records based on user input
    const query = {};
    if (MobileNumber) {
      query.MobileNumber = MobileNumber;
    }

    // Check if the client name provided and add it to the query (case-insensitive)
    if (CandidateName) {
      query.CandidateName = { $regex: new RegExp(CandidateName, "i") };
    }

    // Check if the status provided and add it to the query (case-insensitive)
    if (Domain) {
      query.Domain = { $regex: new RegExp(Domain, "i") };
    }

    if (Notice_peried) {
      query.Notice_peried = { $regex: new RegExp(Notice_peried, "i") };
    }

    // Check if fromDate and toDate provided and add them to the query
    if (fromDate && toDate) {
      // Set time to the end of the day for toDate
      const endDate = new Date(toDate);
      endDate.setHours(23, 59, 59);
    
      query.date = { $gte: new Date(fromDate), $lte: endDate };
    } else if (fromDate) {
      query.date = { $gte: new Date(fromDate) };
    } else if (toDate) {
      // Set time to the end of the day for toDate
      const endDate = new Date(toDate);
      endDate.setHours(23, 59, 59);
    
      query.date = { $lte: endDate };
    }

    // If no query parameters provided, fetch all records
    const users = await (Object.keys(query).length ? RecuteModule.find(query) : RecuteModule.find());

    // Return the found users
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// get all the admin post
export async function getAdminPostClientRequirement(req, res) {
  const { Ticket_no, Client_Name, status, fromDate, toDate } = req.query;

  try {
    // Create a query object to filter records based on user input
    const query = {};

    // Check if the user provided Ticket_no and add it to the query
    if (Ticket_no) {
      query.Ticket_no = Ticket_no;
    }

    // Check if the client name provided and add it to the query (case-insensitive)
    if (Client_Name) {
      query.Client_Name = { $regex: new RegExp(Client_Name, "i") };
    }

    // Check if the status provided and add it to the query (case-insensitive)
    if (status) {
      query.status = { $regex: new RegExp(status, "i") };
    }

    // Check if fromDate and toDate provided and add them to the query
    if (fromDate && toDate) {
      // Set time to the end of the day for toDate
      const endDate = new Date(toDate);
      endDate.setHours(23, 59, 59);
    
      query.date = { $gte: new Date(fromDate), $lte: endDate };
    } else if (fromDate) {
      query.date = { $gte: new Date(fromDate) };
    } else if (toDate) {
      // Set time to the end of the day for toDate
      const endDate = new Date(toDate);
      endDate.setHours(23, 59, 59);
    
      query.date = { $lte: endDate };
    }

    // If no query parameters provided, fetch all records
    const users = await (Object.keys(query).length ? AdminModule.find(query) : AdminModule.find());

    // Return the found users
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

//get all the admin post based on the status which as open,sourcing
export async function getAdminPostbyStatus(req,res){
  try {
    const jobs = await AdminModule.find({
      status: { $regex: /open|Interviewing|sourcing/i },
    });

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
}
// get recuter post details by id
export async function getUserById(req, res) {
  try {
    const userId = req.params.id;

    // Ensure that userId is valid and not undefined
    if (!userId) {
      return res.status(400).json({ error: 'User ID is missing' });
    }

    // Fetch the user based on the provided userId
    const user = await RecuteModule.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ data: user });
  } catch (error) {
    console.error("Error fetching user details:", error);
    return res.status(500).json({ error: "Failed to fetch user details" });
  }
}
// get admin details by id
export async function getAdminPostById(req, res) {
  try {
    const userId = req.params.id;

    // Ensure that userId is valid and not undefined
    if (!userId) {
      return res.status(400).json({ error: 'User ID is missing' });
    }

    // Fetch the user based on the provided userId
    const user = await AdminModule.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ data: user });
  } catch (error) {
    console.error("Error fetching user details:", error);
    return res.status(500).json({ error: "Failed to fetch user details" });
  }
}

// GET method for fetching recruitment posts with Current_Company as "Aroha Technologies"
export async function getArohaRecruitments(req, res) {
  try {
    // Using a case-insensitive regex to match "Aroha Technologies" in any case
    const criteria = { Current_Company: { $regex: 'aroHa tEchNologies', $options: 'i' } };
    
    const posts = await RecuteModule.find(criteria);

    if (posts.length === 0) {
      return res.status(404).json({ error: "No recruitment posts found for Aroha Technologies" });
    }

    return res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching Aroha Technologies recruitments:", error);
    return res.status(500).json({ error: "Failed to fetch Aroha Technologies recruitments" });
  }
}
/** PUT: http://localhost:8080/api/updateuser 
 * @param: {
  "header" : "<token>"
}
body: {
    firstName: '',
    address : '',
    profile : ''
}
*/
export async function getRecuterSourcedDetails(req, res) {
  const { username } = req.params;
  const { fromDate, toDate } = req.query;

  try {
    const query = { username };

    // Check if both fromDate and toDate are provided
    if (fromDate && toDate) {
      // Set time to the start of the day for fromDate
      const startDate = new Date(fromDate);
      startDate.setHours(0, 0, 0);

      // Set time to the end of the day for toDate
      const endDate = new Date(toDate);
      endDate.setHours(23, 59, 59);

      // Add both username and date range to the query
      query.date = { $gte: startDate, $lte: endDate };
    } else {
      // If no date range is provided, just add the username to the query
      query.date = { $exists: true };
    }

    const usersWithUsernameAndDate = await RecuteModule.find(query);

    // Initialize status counts with 0 for all statuses, including "remaining"
    const statusCounts = {
      "Yet to Receive feedback": 0,
      "Selected By Client": 0,
      "Rejected By Aroha": 0,
      "Rejected By Client": 0,
      "remaining": 0
    };

    // If records are found, populate the status counts
    if (usersWithUsernameAndDate && usersWithUsernameAndDate.length > 0) {
      usersWithUsernameAndDate.forEach((user) => {
        const status = user.Status || 'remaining'; // Use 'remaining' for empty or undefined statuses
        statusCounts[status] = (statusCounts[status] || 0) + 1;
      });
    }

    const totalCandidates = usersWithUsernameAndDate.length;

    const result = {
      username,
      totalCandidates,
      statusCounts
    };

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

// user updates
export async function updateUser(req, res) {
  try {
    const { username,firstName,lastName, address, profile,email,mobile } = req.body;
    const { userId } = req.user; // Extract the user ID from the JWT token
    
    UserModel.findByIdAndUpdate(userId, { username,firstName,lastName, address, profile,email,mobile}, { new: true })
      .then(updatedUser => {
        if (!updatedUser) {
          return res.status(404).send({ error: "User not found" });
        }

        return res.status(200).send({ msg: "Record updated successfully", user: updatedUser });
      })
      .catch(error => {
        console.log(error);
        return res.status(500).send({ error: "Failed to update user" });
      });
  } catch (error) {
    return res.status(500).send({ error });
  }
}

// update recute post

  
/** GET: http://localhost:8080/api/generateOTP */
export async function generateOTP(req,res){
  req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false})
  res.status(201).send({ code: req.app.locals.OTP })
}

/** GET: http://localhost:8080/api/verifyOTP */
export async function verifyOTP(req,res){
  const { code } = req.query;
  if(parseInt(req.app.locals.OTP) === parseInt(code)){
      req.app.locals.OTP = null; // reset the OTP value
      req.app.locals.resetSession = true; // start session for reset password
      return res.status(201).send({ msg: 'Verify Successsfully!'})
  }
  return res.status(400).send({ error: "Invalid OTP"});
}

// successfully redirect user when OTP is valid
/** GET: http://localhost:8080/api/createResetSession */
export async function createResetSession(req,res){
  if(req.app.locals.resetSession){
    return res.status(201).send({flag:req.app.locals.resetSession})
   }
   return res.status(440).send({error:"session expired"})
}


// update the password when we have valid session
/** PUT: http://localhost:8080/api/resetPassword */
export async function resetPassword(req, res) {
  try {
    if(!req.app.locals.resetSession) return res.status(440).send({error:"session expired"})
    const { username, password } = req.body;
    
    try {
      const user = await UserModel.findOne({ username });
      
      if (!user) {
        return res.status(404).send({ error: "Username not found" });
      }
      
      const hashedPassword = await bcrypt.hash(password, 10);
      
      await UserModel.updateOne({ username: user.username }, { password: hashedPassword });
      
      return res.status(201).send({ msg: "Record updated...!" });
    } catch (error) {
      return res.status(500).send({ error: "Unable to update password" });
    }
  } catch (error) {
    return res.status(401).send({ error });
  }
}

// Get method to fetch count of candidates by ticket number
export async function getCountByTicket(req, res) {
  try {
    const { Ticket_no } = req.params;

    const totalnumber_of_candidates = await RecuteModule.countDocuments({ Ticket_no });
    const rejectedbyaroha = await RecuteModule.countDocuments({ Ticket_no, Status: { $regex: 'rejected by aroha', $options: 'i' } });
    const selectedbyclient = await RecuteModule.countDocuments({ Ticket_no, Status: { $regex: 'selected By Client', $options: 'i' } });
    const rejectededbyclient = await RecuteModule.countDocuments({ Ticket_no, Status: { $regex: 'rejected By Client', $options: 'i' } });
    const FeedBack = await RecuteModule.countDocuments({ Ticket_no, Status: { $regex: 'Yet to Receive feedback', $options: 'i' } });

    // Fetch client_name from the ClientModel based on Ticket_no
    const clientInfo = await AdminModule.findOne({ Ticket_no });
    const Client_Name = clientInfo ? clientInfo.Client_Name : null;
    const Tech_stack = clientInfo ? clientInfo.Tech_stack : null;

    res.json({
      Ticket_no,
      totalnumber_of_candidates,
      rejectedbyaroha,
      selectedbyclient,
      rejectededbyclient,
      FeedBack,
      Client_Name,
      Tech_stack
    });
  } catch (error) {
    console.error('Error fetching counts:', error);
    res.status(500).json({ error: 'An error occurred while fetching the counts.' });
  }
}

export async function Complaient(req, res) {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ error: 'Authentication failed or user not found' });
    }

    const { Complaient, PostedUser } = req.body;

      // Check if the complaint is empty
      if (!Complaient) {
        return res.status(409).json({ error: 'Complaint is required' });
      }

    // Extract the username from the user object
    const username = req.user.username;

    const currentTimeIST = moment.tz('Asia/Kolkata').format('YYYY-MM-DD hh:mm:ss A');

    const Complaient_details = {
      Complaient,
      PostedUser: username,
      date:currentTimeIST
    };
    
    // Create a new ComplaintModel document with the data
    const newComplaint = new DeveloperModel(Complaient_details);

    // Save the ComplaintModel document to the database
    try {
      const result = await newComplaint.save();

      const email = {
        from: 'arohatechnologies0@gmail.com',
        to: 'abineshajith81@gmail.com',
        subject: 'User Suggession',
        html: `
          <h1>User Suggession</h1>
          <h2>Posted By:${result.PostedUser}</h2>
          <h3>Date: ${result.date}</h3>
          <h4>FeedBack: ${result.Complaient}</h4>
          <br/>
          THANK YOU 
          <br/>
          YOUR TRULY AROHA TECHNOLOGIES
        `,
      };

      // Send the email using the transporter
      try {
        const info = await transporter.sendMail(email);
        console.log("Email sent: " + info.response);
        res.status(201).send({ msg: "User Suggession send successfully", Client_Complaient: result });
      } catch (emailError) {
        console.log(emailError);
        res.status(500).send({ error: "Failed to send email" });
      }
    } catch (saveError) {
      console.log(saveError);
      res.status(500).send({ error: "Failed to save complaint" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
}