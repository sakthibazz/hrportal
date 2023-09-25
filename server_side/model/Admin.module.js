import mongoose from "mongoose";

const CounterSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    sequence_value: { type: Number, default: 1 },
  });
  
  // Create a model for the Counter collection
  const CounterModel = mongoose.model("Counter", CounterSchema);
  
  // Create the main user schema
  const UserSchema = new mongoose.Schema({
    Ticket_no: {
      type: Number,
      unique: true,
    },
    Client_Name: {
      type: String,
      required: [true, "Please provide the Client_Name"],
    },
    Open_position: { 
      type: Number,
      required: [true, "Please provide candidate Open_position"],
    },
    Yre_of_exp: {
      type: Number,
      required: [true, "Please provide Yre_of_exp number"],
    },
    Tech_stack: [
      {
        id: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
      },
    ],
    Budget: {
      type: Number,
      required: [true, "Please provide the budget"],
    },
    Location: {
      type: String,
      required: [true, "Please provide the location"],
    },
    status: {
      type: String,
      required: [true, "Please provide the status"],
    },
    Job_Description: {
      type: String,
    },
    Job_Des: {
      type: String,
    },
    Mode: {
      type: String,
    },
    PostedUser: {
      type: String,
    },
    Job_Mode:{
      type:String 
    },
    date: {
      type: Date,
      default: Date.now,
    },
    userupdate: {
      lastupdate: {
        type: String,
      },
      updatedFields: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
      },
    }
  });
  
  // Pre-save middleware to handle auto-increment for Ticket_no
  UserSchema.pre("save", async function (next) {
    if (!this.Ticket_no) {
      try {
        // Find the counter document and increment the sequence_value by 1
        const counterDoc = await CounterModel.findOneAndUpdate(
          { _id: "ticketId" },
          { $inc: { sequence_value: 1 } },
          { new: true, upsert: true }
        ).lean();
  
        // Set the Ticket_no with the current sequence_value
        this.Ticket_no = counterDoc.sequence_value;
        next();
      } catch (error) {
        return next(error);
      }
    } else {
      next();
    }
  });

export default mongoose.model.User || mongoose.model("ADMINUPDATE",UserSchema)