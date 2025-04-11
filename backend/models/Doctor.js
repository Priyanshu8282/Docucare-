import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: { type: String },
  age: { type: Number },
  gender: { type: String },
  ProfileImage: { type: String },
  phoneNumber: { type: String },
  specialty: { type: String },
  yearsOfExperience: { type: Number },
  availability: [
    {
      day: { type: String },
      startTime: { type: String },
      endTime: { type: String },
    },
  ],
  fees: { type: Number, required: true },
  isApproved: { type: Boolean, default: false }
});

const doctorModel = mongoose.model("Doctor", doctorSchema, "Doctor");

export default doctorModel;
