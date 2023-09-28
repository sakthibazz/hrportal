import mongoose from "mongoose";

export const UserSchema=new mongoose.Schema({
    Ticket_no:{
        type:Number,
        require:[true,"please provide th ticket number"]
    },
    CandidateName:{
        type:String,
        require:[true,"please provide candidate name"]
    },
    MobileNumber:{
        type:Number,
        require:[true,"please provide candidate moble number"]
    },
    Email:{
        type:String,
        require:[true,"please provide candidate Email"]
    },
    Yre_of_expe:[],
    Relevent_Yre_of_exp:[],
    Domain:[],
    CTC: { 
        type: Number
    },
    ECTC: { 
        type: Number
    },
    Current_location: [],
    Preffered_location: [],
    Reason_for_change: { 
        type: String
    },
    Notice_peried:{
        type:String
    },
    Current_Company:{
        type:String
    },
    Comment:{ 
        type:String
    },
    Status: {
         type: String
        },
    Client_feedback:{
        type: String
    },
    Upload_resume: { 
        type: String
    },
    date: {
        type: Date,
        default: Date.now, 
      },
    username:{
        type: String
      },
    lastupdate:{
        type: String
      }

})

export default mongoose.model.User || mongoose.model("RECUTERUPDATE",UserSchema)