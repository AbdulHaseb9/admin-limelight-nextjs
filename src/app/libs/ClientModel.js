// /app/Libs/UserModel.js
import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true, // ek email bar bar use nahi hogi
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    joinedAt: {
      type: Date,
      default: Date.now, // jab user create hoga us waqt ka time store hoga
    },
  },
  { timestamps: true } // automatically createdAt & updatedAt add ho jata hai
);

// agar model already bana hua hai to dobara create na ho
const Client = mongoose.models.ClientInfromation || mongoose.model("ClientInfromation", ClientSchema);

export default Client;
