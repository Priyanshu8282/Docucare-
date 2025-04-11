import mongoose from 'mongoose';

// Define the user schema
const userSchema = new mongoose.Schema(
  {
   fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    mobile_no: {
      type: Number,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['Patient', 'Doctor', 'Admin'],
    },
  },
  {
    timestamps: true,
  }
);

// Create the user model
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;