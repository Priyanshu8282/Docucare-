import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';

function ManagePatients() {
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: 'John Doe',
      age: 30,
      contact: '123-456-7890',
      address: '123 Main St',
      image: 'https://via.placeholder.com/100', // Placeholder image
    },
    {
      id: 2,
      name: 'Jane Smith',
      age: 25,
      contact: '987-654-3210',
      address: '456 Elm St',
      image: 'https://via.placeholder.com/100', // Placeholder image
    },
  ]);
  const [newPatient, setNewPatient] = useState({
    name: '',
    age: '',
    contact: '',
    address: '',
    image: '',
  });
  const [editingPatient, setEditingPatient] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient({ ...newPatient, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewPatient({ ...newPatient, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPatient = () => {
    if (!newPatient.name || !newPatient.age || !newPatient.contact || !newPatient.address || !newPatient.image) {
      alert('Please fill in all fields and upload an image.');
      return;
    }
    setPatients([...patients, { id: Date.now(), ...newPatient }]);
    setNewPatient({ name: '', age: '', contact: '', address: '', image: '' });
  };

  const handleEditPatient = (patient) => {
    setEditingPatient(patient);
    setNewPatient(patient);
  };

  const handleUpdatePatient = () => {
    setPatients(
      patients.map((pat) =>
        pat.id === editingPatient.id ? newPatient : pat
      )
    );
    setEditingPatient(null);
    setNewPatient({ name: '', age: '', contact: '', address: '', image: '' });
  };

  const handleDeletePatient = (id) => {
    setPatients(patients.filter((pat) => pat.id !== id));
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-[#2C698D] mb-4">
        <FontAwesomeIcon icon={faUser} className="mr-2" />
        Manage Patients
      </h1>

      {/* Add/Edit Patient Form */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          {editingPatient ? 'Edit Patient' : 'Add Patient'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Patient Name"
            value={newPatient.name}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={newPatient.age}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            value={newPatient.contact}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={newPatient.address}
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
          onClick={editingPatient ? handleUpdatePatient : handleAddPatient}
          className="mt-4 bg-[#2C698D] text-white px-4 py-2 rounded hover:bg-[#5EBEC4] transition duration-300"
        >
          {editingPatient ? 'Update Patient' : 'Add Patient'}
        </button>
      </div>

      {/* Patients List */}
      <h2 className="text-xl font-semibold text-gray-700 mb-2">All Patients</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Image</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Age</th>
            <th className="border border-gray-300 p-2">Contact</th>
            <th className="border border-gray-300 p-2">Address</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td className="border border-gray-300 p-2">
                <img src={patient.image} alt={patient.name} className="h-16 w-16 rounded-full" />
              </td>
              <td className="border border-gray-300 p-2">{patient.name}</td>
              <td className="border border-gray-300 p-2">{patient.age}</td>
              <td className="border border-gray-300 p-2">{patient.contact}</td>
              <td className="border border-gray-300 p-2">{patient.address}</td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => handleEditPatient(patient)}
                  className="text-blue-500 hover:underline mr-2"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  onClick={() => handleDeletePatient(patient.id)}
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

export default ManagePatients;