import Patient from "../../models/Patient.js";
import User from "../../models/AuthModel.js";
import Doctor from "../../models/Doctor.js";

// Enum values for validation
const GENDER_ENUM = ["Male", "Female", "Other"];
const BLOOD_GROUP_ENUM = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

// ✅ Create or Update Patient
export const createOrUpdatePatient = async (req, res) => {
  try {
    const { user, fullName, email, mobile_no, age, gender, bloodGroup, allergies } = req.body;
    let { address } = req.body;
    const profilePicture = req.file ? req.file.path : null; // Assuming req.file.path contains the Cloudinary URL

    // Validate required fields
    if (!user || !fullName || !email || !mobile_no || !age || !gender || !bloodGroup) {
      return res.status(400).json({ message: "All required fields must be provided." });
    }

    // Validate enum fields
    if (!GENDER_ENUM.includes(gender)) {
      return res.status(400).json({ message: "Invalid gender value." });
    }
    if (!BLOOD_GROUP_ENUM.includes(bloodGroup)) {
      return res.status(400).json({ message: "Invalid blood group value." });
    }

    // Validate user existence
    const existingUser = await User.findById(user);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found. Please create a user first." });
    }

    // Prepare patient data
    const patientData = {
      user,
      fullName,
      email,
      mobile_no,
      age,
      gender,
      bloodGroup,
      profilePicture, // Store Cloudinary URL here
      allergies,
      address: {
        street: address?.street || '',
        city: address?.city || '',
        state: address?.state || '',
        zipCode: address?.zipCode || '',
      },
    };

    // Check if patient profile exists
    let patientProfile = await Patient.findOne({ user });

    if (patientProfile) {
      // Update existing profile
      Object.assign(patientProfile, patientData);
      await patientProfile.save();

      return res.status(200).json({
        message: "Patient profile updated successfully.",
        profile: patientProfile,
      });
    } else {
      // Create new profile
      const newProfile = new Patient(patientData);
      await newProfile.save();

      return res.status(201).json({
        message: "Patient profile created successfully.",
        profile: newProfile,
      });
    }
  } catch (error) {
    console.error("Error processing patient profile:", error);
    res.status(500).json({ message: "Error processing patient profile.", error });
  }
};




// ✅ Get Single Patient by ID
export const getPatientById = async (req, res) => {
  try {
    const { userId } = req.params; // Extract userId from request parameters

    // Find the patient by userId
    const patient = await Patient.findOne({ user: userId }).populate("user");

    if (!patient) {
      return res.status(404).json({ message: "Patient not found." });
    }

    // Include the Cloudinary URL for the profile picture
    const profileImageUrl = patient.profilePicture
      ? patient.profilePicture // Assuming it already contains the Cloudinary URL
      : null;

    res.status(200).json({
      ...patient.toObject(), // Convert Mongoose document to plain object
      profileImageUrl, // Add the profile image URL
    });
  } catch (error) {
    console.error("Error fetching patient:", error);
    res.status(500).json({ message: "Error fetching patient", error });
  }
};


// ✅ Update Patient Details
export const updatePatient = async (req, res) => {
  try {
    const { age, gender, bloodGroup, allergies, address, contactNumber } = req.body;

    // Validate enum fields
    if (gender && !GENDER_ENUM.includes(gender)) {
      return res.status(400).json({ message: "Invalid gender value" });
    }
    if (bloodGroup && !BLOOD_GROUP_ENUM.includes(bloodGroup)) {
      return res.status(400).json({ message: "Invalid blood group value" });
    }

    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id,
      { age, gender, bloodGroup, allergies, address, contactNumber },
      { new: true }
    );
    if (!updatedPatient) return res.status(404).json({ message: "Patient not found" });

    res.status(200).json({ message: "Patient updated successfully", patient: updatedPatient });
  } catch (error) {
    res.status(500).json({ message: "Error updating patient", error });
  }
};

// ✅ Get Patient Medical History
export const getMedicalHistory = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).populate("medicalHistory");
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    res.status(200).json(patient.medicalHistory);
  } catch (error) {
    res.status(500).json({ message: "Error fetching medical history", error });
  }
};

// ✅ Get All Doctors
export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctors", error });
  }
};

// ✅ Delete Patient
export const deletePatient = async (req, res) => {
  try {
    const deletedPatient = await Patient.findByIdAndDelete(req.params.id);
    if (!deletedPatient) return res.status(404).json({ message: "Patient not found" });

    res.status(200).json({ message: "Patient deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting patient", error });
  }
};