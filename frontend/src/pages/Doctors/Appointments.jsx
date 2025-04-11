import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch appointments from the API
  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('Token is missing. Please log in again.');
          return;
        }

        const response = await axios.get('http://localhost:3000/doctor/appointments', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAppointments(response.data);
        toast.success('Appointments fetched successfully!');
      } catch (error) {
        console.error('Error fetching appointments:', error.response?.data || error.message);
        toast.error('Failed to fetch appointments.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <Toaster />
      <h1 className="text-2xl font-bold text-[#2C698D] mb-4">Appointments</h1>

      {isLoading ? (
        <div className="text-center text-gray-500">Loading appointments...</div>
      ) : appointments.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Patient Name</th>
              <th className="border border-gray-300 p-2">Date</th>
              <th className="border border-gray-300 p-2">Time</th>
              <th className="border border-gray-300 p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td className="border border-gray-300 p-2">{appointment.patientName}</td>
                <td className="border border-gray-300 p-2">{appointment.date}</td>
                <td className="border border-gray-300 p-2">{appointment.time}</td>
                <td className="border border-gray-300 p-2">{appointment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center text-gray-500 mt-4">No appointments found.</div>
      )}
    </div>
  );
}

export default Appointments;