import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentTime, setAppointmentTime] = useState('');
  const [appointmentEndTime, setAppointmentEndTime] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:3000/doctors');
        setDoctors(response.data.doctors || []);
        toast.success('Doctors fetched successfully!');
      } catch (error) {
        console.error('Error fetching doctors:', error.response?.data || error.message);
        toast.error('Failed to fetch doctors.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleBookAppointment = async (doctorId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('You must be logged in to book an appointment.');
        return;
      }

      if (!appointmentTime) {
        toast.error('Please select an appointment time.');
        return;
      }

      const response = await axios.post(
        'http://localhost:3000/appointments',
        {
          doctor: doctorId,
          appointmentTime,
          appointmentEndTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success('Appointment booked successfully!');
      // Clear form
      setSelectedDoctor(null);
      setAppointmentTime('');
      setAppointmentEndTime('');
    } catch (error) {
      console.error('Error booking appointment:', error.response?.data || error.message);
      toast.error('Failed to book appointment.');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Toaster />
      <h1 className="text-2xl font-bold mb-4 text-[#2C698D]">All Doctors</h1>

      {isLoading ? (
        <p>Loading doctors...</p>
      ) : doctors.length === 0 ? (
        <p>No doctors found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
            >
              <h2 className="text-lg font-semibold text-[#2C698D] mb-2">{doctor.name}</h2>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Specialty:</strong> {doctor.specialty || 'N/A'}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Experience:</strong> {doctor.yearsOfExperience || 0} years
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Contact:</strong> {doctor.phoneNumber || 'N/A'}
              </p>
              <p className="text-sm text-gray-600 mb-3">
                <strong>Fees:</strong> ${doctor.fees || 'N/A'}
              </p>

              <button
                onClick={() => setSelectedDoctor(doctor._id)}
                className="bg-[#2C698D] text-white px-4 py-2 rounded hover:bg-[#1e4e6c] transition-colors duration-300"
              >
                Book Appointment
              </button>

              {selectedDoctor === doctor._id && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Start Time:</label>
                  <input
                    type="datetime-local"
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    className="border p-2 rounded w-full mb-2"
                  />
                  <label className="block text-sm font-medium text-gray-700 mb-1">Appointment End Time:</label>
                  <input
                    type="datetime-local"
                    value={appointmentEndTime}
                    onChange={(e) => setAppointmentEndTime(e.target.value)}
                    className="border p-2 rounded w-full mb-2"
                  />
                  <button
                    onClick={() => handleBookAppointment(doctor._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300 w-full"
                  >
                    Confirm Booking
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Doctors;
