import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function PatientRecords() {
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    contact: '',
    address: '',
    medicalHistory: '',
  });
  const [editingPatient, setEditingPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch patient records from the API
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('Token is missing. Please log in again.');
          return;
        }

        const response = await axios.get('http://localhost:3000/doctor/patients', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPatients(response.data);
        setFilteredPatients(response.data);
        toast.success('Patient records fetched successfully!');
      } catch (error) {
        console.error('Error fetching patient records:', error.response?.data || error.message);
        toast.error('Failed to fetch patient records.');
      }
    };

    fetchPatients();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredPatients(
      patients.filter((patient) =>
        patient.name.toLowerCase().includes(query) || patient.contact.toLowerCase().includes(query)
      )
    );
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add or update patient
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Token is missing. Please log in again.');
        return;
      }

      if (editingPatient) {
        // Update patient
        await axios.put(`http://localhost:3000/doctor/patients/${editingPatient.id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success('Patient updated successfully!');
      } else {
        // Add new patient
        const response = await axios.post('http://localhost:3000/doctor/patients', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPatients([...patients, response.data]);
        setFilteredPatients([...patients, response.data]);
        toast.success('Patient added successfully!');
      }

      setFormData({ name: '', age: '', contact: '', address: '', medicalHistory: '' });
      setEditingPatient(null);
    } catch (error) {
      console.error('Error saving patient:', error.response?.data || error.message);
      toast.error('Failed to save patient.');
    } finally {
      setIsLoading(false);
    }
  };

  // Edit patient
  const handleEdit = (patient) => {
    setEditingPatient(patient);
    setFormData(patient);
  };

  // Delete patient
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Token is missing. Please log in again.');
        return;
      }

      await axios.delete(`http://localhost:3000/doctor/patients/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPatients(patients.filter((patient) => patient.id !== id));
      setFilteredPatients(filteredPatients.filter((patient) => patient.id !== id));
      toast.success('Patient deleted successfully!');
    } catch (error) {
      console.error('Error deleting patient:', error.response?.data || error.message);
      toast.error('Failed to delete patient.');
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <Toaster />
      <h1 className="text-2xl font-bold text-[#2C698D] mb-4">Patient Records</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name or contact"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full border border-gray-300 rounded p-2"
        />
      </div>

      {/* Add/Edit Patient Form */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">
          {editingPatient ? 'Edit Patient' : 'Add Patient'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            name="contact"
            placeholder="Contact"
            value={formData.contact}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
            required
          />
          <textarea
            name="medicalHistory"
            placeholder="Medical History"
            value={formData.medicalHistory}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
            rows="3"
          />
        </div>
        <button
          type="submit"
          className="bg-[#2C698D] text-white px-4 py-2 rounded hover:bg-[#5EBEC4]"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : editingPatient ? 'Update Patient' : 'Add Patient'}
        </button>
      </form>

      {/* Patient Records Table */}
      {filteredPatients.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Age</th>
              <th className="border border-gray-300 p-2">Contact</th>
              <th className="border border-gray-300 p-2">Address</th>
              <th className="border border-gray-300 p-2">Medical History</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient) => (
              <tr key={patient.id}>
                <td className="border border-gray-300 p-2">{patient.name}</td>
                <td className="border border-gray-300 p-2">{patient.age}</td>
                <td className="border border-gray-300 p-2">{patient.contact}</td>
                <td className="border border-gray-300 p-2">{patient.address}</td>
                <td className="border border-gray-300 p-2">{patient.medicalHistory}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => handleEdit(patient)}
                    className="text-blue-500 hover:underline mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(patient.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center text-gray-500 mt-4">No patient records found.</div>
      )}
    </div>
  );
}

export default PatientRecords;