import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function Billing() {
  const [billingReports, setBillingReports] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalRevenue, setTotalRevenue] = useState(0);

  // Fetch billing reports from the API
  useEffect(() => {
    const fetchBillingReports = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('Token is missing. Please log in again.');
          return;
        }

        const response = await axios.get('http://localhost:3000/admin/billing/reports', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBillingReports(response.data.reports);
        setTotalRevenue(response.data.totalRevenue);
        toast.success('Billing reports fetched successfully!');
      } catch (error) {
        console.error('Error fetching billing reports:', error.response?.data || error.message);
        toast.error('Failed to fetch billing reports.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBillingReports();
  }, []);

  // Handle invoice generation
  const handleGenerateInvoice = async (reportId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Token is missing. Please log in again.');
        return;
      }

      const response = await axios.post(
        `http://localhost:3000/admin/billing/reports/${reportId}/generate-invoice`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success('Invoice generated successfully!');
      // Optionally, you can refresh the billing reports here
    } catch (error) {
      console.error('Error generating invoice:', error.response?.data || error.message);
      toast.error('Failed to generate invoice.');
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <Toaster />
      <h1 className="text-2xl font-bold text-[#2C698D] mb-4">Billing Management</h1>

      {/* Total Revenue */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700">Total Revenue</h2>
        <p className="text-2xl font-bold text-green-600">${totalRevenue.toLocaleString()}</p>
      </div>

      {/* Billing Reports Table */}
      {isLoading ? (
        <div className="text-center text-gray-500">Loading billing reports...</div>
      ) : billingReports.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Report ID</th>
              <th className="border border-gray-300 p-2">Date</th>
              <th className="border border-gray-300 p-2">Amount</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {billingReports.map((report) => (
              <tr key={report.id}>
                <td className="border border-gray-300 p-2">{report.id}</td>
                <td className="border border-gray-300 p-2">{report.date}</td>
                <td className="border border-gray-300 p-2">${report.amount.toLocaleString()}</td>
                <td className="border border-gray-300 p-2">
                  {report.status === 'Paid' ? (
                    <span className="text-green-500 font-semibold">{report.status}</span>
                  ) : (
                    <span className="text-red-500 font-semibold">{report.status}</span>
                  )}
                </td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => handleGenerateInvoice(report.id)}
                    className="text-blue-500 hover:underline"
                  >
                    Generate Invoice
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center text-gray-500 mt-4">No billing reports found.</div>
      )}
    </div>
  );
}

export default Billing;