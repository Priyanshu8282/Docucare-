import express from 'express';
import {
  getPatientById,
  getMedicalHistory,
  getAllDoctors,
  createOrUpdatePatient,
} from '../../controller/Patient/patientController.js'; // Import the controller functions
import { VerifyToken } from '../../middleware/auth.js'; // Import the middleware
import upload from '../../config/cloudinary.js'; // Import Multer middleware for file uploads

const patientRouter = express.Router();

// Route to create or update patient profile
patientRouter
  .route('/')
  .post(
    VerifyToken(['Patient', 'Admin']), // Allow Patients and Admins to create or update profiles
    upload.single('profilePicture'), // Handle file uploads for profilePicture
    createOrUpdatePatient
  );

// Route to get patient profile by userId
patientRouter
  .route('/:userId')
  .get(VerifyToken(['Patient', 'Admin']), getPatientById); // Patients and admins can access patient data by userId

// Route to get medical history by patient ID
patientRouter
  .route('/:userid/medical-history')
  .get(VerifyToken(['Patient', 'Doctor']), getMedicalHistory); // Patients and doctors can view medical history

// Route to get all doctors
patientRouter
  .route('/doctors')
  .get(VerifyToken(['Patient', 'Admin']), getAllDoctors); // Patients and admins can view all doctors

export default patientRouter;