import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function MedicalRecord() {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMedicalRecords = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('You must be logged in to view medical records.');
          return;
        }

        const response = await axios.get('http://localhost:3000/medical-records', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setMedicalRecords(response.data.records || []);
        toast.success('Medical records fetched successfully!');
      } catch (error) {
        console.error('Error fetching medical records:', error.response?.data || error.message);
        toast.error('Failed to fetch medical records.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMedicalRecords();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <Toaster />
      <h1 className="text-2xl font-bold mb-4 text-[#2C698D]">My Medical Records</h1>
      {isLoading ? (
        <p>Loading medical records...</p>
      ) : medicalRecords.length === 0 ? (
        <p>No medical records found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {medicalRecords.map((record) => (
            <div
              key={record._id}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
            >
              <h2 className="text-lg font-semibold text-[#2C698D] mb-2">
                {record.title || 'Untitled Record'}
              </h2>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Date:</strong> {new Date(record.date).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Description:</strong> {record.description || 'No description provided.'}
              </p>
              <div className="mt-2">
                {record.files && record.files.length > 0 ? (
                  <ul className="text-sm text-blue-600 underline">
                    {record.files.map((file, index) => (
                      <li key={index}>
                        <a href={file.url} target="_blank" rel="noopener noreferrer">
                          {file.name || `File ${index + 1}`}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No files attached.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MedicalRecord;
