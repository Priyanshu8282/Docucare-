import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function Reports() {
  const [reports, setReports] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredReports, setFilteredReports] = useState([]);

  // Fetch reports from the API
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('Token is missing. Please log in again.');
          return;
        }

        const response = await axios.get('http://localhost:3000/doctor/reports', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setReports(response.data);
        setFilteredReports(response.data);
        toast.success('Reports fetched successfully!');
      } catch (error) {
        console.error('Error fetching reports:', error.response?.data || error.message);
        toast.error('Failed to fetch reports.');
      }
    };

    fetchReports();
  }, []);

  // Handle filter input change
  const handleFilterChange = (e) => {
    const query = e.target.value.toLowerCase();
    setFilter(query);
    setFilteredReports(
      reports.filter((report) =>
        report.title.toLowerCase().includes(query) || report.type.toLowerCase().includes(query)
      )
    );
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <Toaster />
      <h1 className="text-2xl font-bold text-[#2C698D] mb-4">Reports</h1>

      {/* Filter Section */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by title or type"
          value={filter}
          onChange={handleFilterChange}
          className="w-full border border-gray-300 rounded p-2"
        />
      </div>

      {/* Reports List */}
      {filteredReports.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Title</th>
              <th className="border border-gray-300 p-2">Date</th>
              <th className="border border-gray-300 p-2">Type</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((report) => (
              <tr key={report.id}>
                <td className="border border-gray-300 p-2">{report.title}</td>
                <td className="border border-gray-300 p-2">{report.date}</td>
                <td className="border border-gray-300 p-2">{report.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center text-gray-500 mt-4">No reports found.</div>
      )}
    </div>
  );
}

export default Reports;