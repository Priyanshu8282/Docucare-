import express from 'express';
import {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor
} from '../../controller/Doctor/doctorController.js';
import { VerifyToken } from '../../middleware/auth.js'; // Import the middleware

const doctorRouter = express.Router();

doctorRouter
  .route('/')
  .post(
    VerifyToken(['Admin']), // Only Admins can create a doctor
    createDoctor
  )
  .get(
    VerifyToken(['Admin']), // Only Admins can create a doctor
    getAllDoctors
  )

doctorRouter
  .route('/:id')
  .get(
    VerifyToken(['Admin', 'Doctor', 'Patient']), // Admins, Doctors, and Patients can view doctor details
    getDoctorById
  )
  .patch(
    VerifyToken(['Admin']), // Only Admins can update doctor details
    updateDoctor
  )
  .delete(
    VerifyToken(['Admin']), // Only Admins can delete a doctor
    deleteDoctor
  );

export default doctorRouter;