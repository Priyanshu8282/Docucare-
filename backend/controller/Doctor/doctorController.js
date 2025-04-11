import Doctor from "../../models/Doctor.js";

// ✅ Create a New Doctor
export const createDoctor = async (req, res) => {
  try {
    const {
      name,
      age,
      gender,
      ProfileImage,
      phoneNumber,
      specialty,
      yearsOfExperience,
      availability,
      fees,
      isApproved,
    } = req.body;

    // Validate required fields
    if (!name || !phoneNumber || !specialty || !yearsOfExperience || !fees) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    // Create a new doctor
    const newDoctor = new Doctor({
      name,
      age,
      gender,
      ProfileImage,
      phoneNumber,
      specialty,
      yearsOfExperience,
      availability,
      fees,
      isApproved,
    });

    await newDoctor.save();
    res.status(201).json({ message: "Doctor created successfully", doctor: newDoctor });
  } catch (error) {
    console.error("Error creating doctor:", error);
    res.status(500).json({ message: "Error creating doctor", error });
  }
};

// ✅ Get Single Doctor by ID
export const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    res.status(200).json(doctor);
  } catch (error) {
    console.error("Error fetching doctor:", error);
    res.status(500).json({ message: "Error fetching doctor", error });
  }
};
export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find(); // Fetch all doctors
    res.status(200).json(doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ message: "Error fetching doctors", error });
  }
};
// ✅ Update Doctor Details
export const updateDoctor = async (req, res) => {
  try {
    const updateFields = req.body; // Get the fields to update from the request body

    // Validate required fields if necessary
    if (!updateFields.name && !updateFields.phoneNumber && !updateFields.specialty && !updateFields.yearsOfExperience && !updateFields.fees) {
      return res.status(400).json({ message: "At least one field is required to update" });
    }

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields }, // Use $set to update only the provided fields
      { new: true } // Return the updated document
    );

    if (!updatedDoctor) return res.status(404).json({ message: "Doctor not found" });

    res.status(200).json({ message: "Doctor updated successfully", doctor: updatedDoctor });
  } catch (error) {
    console.error("Error updating doctor:", error);
    res.status(500).json({ message: "Error updating doctor", error });
  }
};

// ✅ Delete Doctor
export const deleteDoctor = async (req, res) => {
  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!deletedDoctor) return res.status(404).json({ message: "Doctor not found" });

    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    console.error("Error deleting doctor:", error);
    res.status(500).json({ message: "Error deleting doctor", error });
  }
};