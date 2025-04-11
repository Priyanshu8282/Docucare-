import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function Billing() {
  const [bills, setBills] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch bills from the API
  useEffect(() => {
    const fetchBills = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('Token is missing. Please log in again.');
          return;
        }

        const response = await axios.get('http://localhost:3000/patient/bills', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBills(response.data);
        toast.success('Bills fetched successfully!');
      } catch (error) {
        console.error('Error fetching bills:', error.response?.data || error.message);
        toast.error('Failed to fetch bills.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBills();
  }, []);

  // Handle invoice download
  const handleDownloadInvoice = async (invoiceId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Token is missing. Please log in again.');
        return;
      }

      const response = await axios.get(`http://localhost:3000/patient/bills/${invoiceId}/download`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob', // Important for file downloads
      });

      // Create a link to download the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `invoice-${invoiceId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success('Invoice downloaded successfully!');
    } catch (error) {
      console.error('Error downloading invoice:', error.response?.data || error.message);
      toast.error('Failed to download invoice.');
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <Toaster />
      <h1 className="text-2xl font-bold text-[#2C698D] mb-4">Billing</h1>

      {isLoading ? (
        <div className="text-center text-gray-500">Loading bills...</div>
      ) : bills.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Invoice ID</th>
              <th className="border border-gray-300 p-2">Date</th>
              <th className="border border-gray-300 p-2">Amount</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill) => (
              <tr key={bill.id}>
                <td className="border border-gray-300 p-2">{bill.invoiceId}</td>
                <td className="border border-gray-300 p-2">{bill.date}</td>
                <td className="border border-gray-300 p-2">${bill.amount}</td>
                <td className="border border-gray-300 p-2">
                  {bill.status === 'Paid' ? (
                    <span className="text-green-500 font-semibold">{bill.status}</span>
                  ) : (
                    <span className="text-red-500 font-semibold">{bill.status}</span>
                  )}
                </td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => handleDownloadInvoice(bill.invoiceId)}
                    className="text-blue-500 hover:underline"
                  >
                    Download Invoice
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center text-gray-500 mt-4">No bills found.</div>
      )}
    </div>
  );
}

export default Billing;