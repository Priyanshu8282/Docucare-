import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faEdit,
  faTrash,
  faCalendarCheck,
} from '@fortawesome/free-solid-svg-icons';

function Appointments() {
  const [appointments, setAppointments] = useState([
    { id: 1, patient: 'John Doe', doctor: 'Dr. Smith', date: '2025-04-10', time: '10:00 AM' },
    { id: 2, patient: 'Jane Doe', doctor: 'Dr. Brown', date: '2025-04-12', time: '2:00 PM' },
  ]);
  const [newAppointment, setNewAppointment] = useState({
    patient: '',
    doctor: '',
    date: '',
    time: '',
  });
  const [editingAppointment, setEditingAppointment] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment({ ...newAppointment, [name]: value });
  };

  const handleAddAppointment = () => {
    if (!newAppointment.patient || !newAppointment.doctor || !newAppointment.date || !newAppointment.time) {
      alert('Please fill in all fields.');
      return;
    }
    setAppointments([
      ...appointments,
      { id: Date.now(), ...newAppointment },
    ]);
    setNewAppointment({ patient: '', doctor: '', date: '', time: '' });
  };

  const handleEditAppointment = (appointment) => {
    setEditingAppointment(appointment);
    setNewAppointment(appointment);
  };

  const handleUpdateAppointment = () => {
    setAppointments(
      appointments.map((appt) =>
        appt.id === editingAppointment.id ? newAppointment : appt
      )
    );
    setEditingAppointment(null);
    setNewAppointment({ patient: '', doctor: '', date: '', time: '' });
  };

  const handleDeleteAppointment = (id) => {
    setAppointments(appointments.filter((appt) => appt.id !== id));
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-[#2C698D] mb-4">
        <FontAwesomeIcon icon={faCalendarCheck} className="mr-2" />
        Manage Appointments
      </h1>

      {/* Add/Edit Appointment Form */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          {editingAppointment ? 'Edit Appointment' : 'Add Appointment'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="text"
            name="patient"
            placeholder="Patient Name"
            value={newAppointment.patient}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="doctor"
            placeholder="Doctor Name"
            value={newAppointment.doctor}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="date"
            name="date"
            value={newAppointment.date}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="time"
            name="time"
            value={newAppointment.time}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          onClick={editingAppointment ? handleUpdateAppointment : handleAddAppointment}
          className="mt-4 bg-[#2C698D] text-white px-4 py-2 rounded hover:bg-[#5EBEC4] transition duration-300"
        >
          {editingAppointment ? 'Update Appointment' : 'Add Appointment'}
        </button>
      </div>

      {/* Appointments List */}
      <h2 className="text-xl font-semibold text-gray-700 mb-2">All Appointments</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Patient</th>
            <th className="border border-gray-300 p-2">Doctor</th>
            <th className="border border-gray-300 p-2">Date</th>
            <th className="border border-gray-300 p-2">Time</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td className="border border-gray-300 p-2">{appointment.patient}</td>
              <td className="border border-gray-300 p-2">{appointment.doctor}</td>
              <td className="border border-gray-300 p-2">{appointment.date}</td>
              <td className="border border-gray-300 p-2">{appointment.time}</td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => handleEditAppointment(appointment)}
                  className="text-blue-500 hover:underline mr-2"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  onClick={() => handleDeleteAppointment(appointment.id)}
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

export default Appointments;