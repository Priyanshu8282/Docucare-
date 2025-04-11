import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faUserMd } from '@fortawesome/free-solid-svg-icons';

function ManageDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    age: '',
    gender: '',
    specialty: '',
    phoneNumber: '',
    yearsOfExperience: '',
    availability: [], // Initialize as an empty array
    fees: '',
    ProfileImage: '',
  });
  const [editingDoctor, setEditingDoctor] = useState(null);

  // Token for authentication
  const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

  // Axios instance with token
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000', // Replace with your backend URL
    headers: {
      Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
    },
  });

  // Fetch all doctors from the backend
  const fetchDoctors = async () => {
    try {
      const response = await axiosInstance.get('/doctors');
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor({ ...newDoctor, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewDoctor({ ...newDoctor, ProfileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Add a new doctor
  const handleAddDoctor = async () => {
    if (
      !newDoctor.name ||
      !newDoctor.age ||
      !newDoctor.gender ||
      !newDoctor.specialty ||
      !newDoctor.phoneNumber ||
      !newDoctor.yearsOfExperience ||
      !newDoctor.fees ||
      !newDoctor.ProfileImage
    ) {
      alert('Please fill in all fields and upload an image.');
      return;
    }
    try {
      const response = await axiosInstance.post('/doctors', newDoctor);
      setDoctors([...doctors, response.data.doctor]);
      setNewDoctor({
        name: '',
        age: '',
        gender: '',
        specialty: '',
        phoneNumber: '',
        yearsOfExperience: '',
        availability: [],
        fees: '',
        ProfileImage: '',
      });
    } catch (error) {
      console.error('Error adding doctor:', error);
    }
  };

  // Edit a doctor
  const handleEditDoctor = (doctor) => {
    setEditingDoctor(doctor);
    setNewDoctor(doctor);
  };

  // Update a doctor
  const handleUpdateDoctor = async () => {
    try {
      const response = await axiosInstance.put(`/doctors/${editingDoctor.id}`, newDoctor);
      setDoctors(
        doctors.map((doc) =>
          doc.id === editingDoctor.id ? response.data.doctor : doc
        )
      );
      setEditingDoctor(null);
      setNewDoctor({
        name: '',
        age: '',
        gender: '',
        specialty: '',
        phoneNumber: '',
        yearsOfExperience: '',
        availability: [],
        fees: '',
        ProfileImage: '',
      });
    } catch (error) {
      console.error('Error updating doctor:', error);
    }
  };

  // Delete a doctor
  const handleDeleteDoctor = async (id) => {
    try {
      await axiosInstance.delete(`/doctors/${id}`);
      setDoctors(doctors.filter((doc) => doc.id !== id));
    } catch (error) {
      console.error('Error deleting doctor:', error);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-[#2C698D] mb-4">
        <FontAwesomeIcon icon={faUserMd} className="mr-2" />
        Manage Doctors
      </h1>

      {/* Add/Edit Doctor Form */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          {editingDoctor ? 'Edit Doctor' : 'Add Doctor'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Doctor Name"
            value={newDoctor.name}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={newDoctor.age}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          />
          <select
            name="gender"
            value={newDoctor.gender}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input
            type="text"
            name="specialty"
            placeholder="Specialization"
            value={newDoctor.specialty}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={newDoctor.phoneNumber}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            name="yearsOfExperience"
            placeholder="Years of Experience"
            value={newDoctor.yearsOfExperience}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            name="fees"
            placeholder="Consultation Fees"
            value={newDoctor.fees}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          onClick={editingDoctor ? handleUpdateDoctor : handleAddDoctor}
          className="mt-4 bg-[#2C698D] text-white px-4 py-2 rounded hover:bg-[#5EBEC4] transition duration-300"
        >
          {editingDoctor ? 'Update Doctor' : 'Add Doctor'}
        </button>
      </div>

      {/* Doctors List */}
      <h2 className="text-xl font-semibold text-gray-700 mb-2">All Doctors</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Image</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Age</th>
            <th className="border border-gray-300 p-2">Gender</th>
            <th className="border border-gray-300 p-2">Specialization</th>
            <th className="border border-gray-300 p-2">Phone</th>
            <th className="border border-gray-300 p-2">Experience</th>
            <th className="border border-gray-300 p-2">Fees</th>
            <th className="border border-gray-300 p-2">Availability</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.id}>
              <td className="border border-gray-300 p-2">
                <img src={doctor.ProfileImage} alt={doctor.name} className="h-16 w-16 rounded-full" />
              </td>
              <td className="border border-gray-300 p-2">{doctor.name}</td>
              <td className="border border-gray-300 p-2">{doctor.age}</td>
              <td className="border border-gray-300 p-2">{doctor.gender}</td>
              <td className="border border-gray-300 p-2">{doctor.specialty}</td>
              <td className="border border-gray-300 p-2">{doctor.phoneNumber}</td>
              <td className="border border-gray-300 p-2">{doctor.yearsOfExperience} years</td>
              <td className="border border-gray-300 p-2">${doctor.fees}</td>
              <td className="border border-gray-300 p-2">
                {doctor.availability.map((slot, index) => (
                  <div key={index}>
                    {slot.day}: {slot.startTime} - {slot.endTime}
                  </div>
                ))}
              </td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => handleEditDoctor(doctor)}
                  className="text-blue-500 hover:underline mr-2"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  onClick={() => handleDeleteDoctor(doctor.id)}
                  className="text-red-500 hover:underline"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageDoctors;