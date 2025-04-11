import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faCalendarCheck,
  faFileMedical,
  faSignOutAlt,
  faUserMd,
  faUsers,
  faChartBar,
  faFileInvoiceDollar,
} from '@fortawesome/free-solid-svg-icons';
import { logo } from '../../assets';
import ManagePatients from './ManagePatients';
import ManageDoctors from './ManageDoctors';
import Appointments from './Appointments';
import Reports from './Reports';
import Billing from './Billing';

function AdminDashboard() {
  const [activeComponent, setActiveComponent] = useState('welcome');

  useEffect(() => {
    console.log(`Active component changed to: ${activeComponent}`);
  }, [activeComponent]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '/';
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'patients':
        return <ManagePatients />;
      case 'doctors':
        return <ManageDoctors />;
      case 'appointments':
        return <Appointments />;
      case 'reports':
        return <Reports />;
      case 'billing':
        return <Billing />;
      default:
        return (
          <div className="p-6 text-center">
            <h1 className="text-4xl font-bold text-[#2C698D] mb-6">
              Welcome to the Admin Dashboard 🚀
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Manage your healthcare system efficiently with DocuCare's Admin Dashboard.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              <div className="bg-white shadow-md rounded-lg p-4">
                <FontAwesomeIcon icon={faUsers} className="text-[#2C698D] text-3xl mb-2" />
                <h3 className="text-xl font-semibold text-gray-700">Manage Patients</h3>
                <p className="text-gray-500 text-sm">
                  View and manage patient records and profiles.
                </p>
              </div>
              <div className="bg-white shadow-md rounded-lg p-4">
                <FontAwesomeIcon icon={faUserMd} className="text-[#2C698D] text-3xl mb-2" />
                <h3 className="text-xl font-semibold text-gray-700">Manage Doctors</h3>
                <p className="text-gray-500 text-sm">
                  Add, update, or remove doctors from the system.
                </p>
              </div>
              <div className="bg-white shadow-md rounded-lg p-4">
                <FontAwesomeIcon icon={faCalendarCheck} className="text-[#2C698D] text-3xl mb-2" />
                <h3 className="text-xl font-semibold text-gray-700">Appointments</h3>
                <p className="text-gray-500 text-sm">
                  Monitor and manage all appointments in one place.
                </p>
              </div>
              <div className="bg-white shadow-md rounded-lg p-4">
                <FontAwesomeIcon icon={faChartBar} className="text-[#2C698D] text-3xl mb-2" />
                <h3 className="text-xl font-semibold text-gray-700">Reports</h3>
                <p className="text-gray-500 text-sm">
                  Generate and view detailed reports for better insights.
                </p>
              </div>
              <div className="bg-white shadow-md rounded-lg p-4">
                <FontAwesomeIcon icon={faFileInvoiceDollar} className="text-[#2C698D] text-3xl mb-2" />
                <h3 className="text-xl font-semibold text-gray-700">Billing</h3>
                <p className="text-gray-500 text-sm">
                  Manage and review billing and invoices.
                </p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">
      {/* Sidebar for Large Devices */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 bg-[#2C698D] text-white">
        {/* Logo Section */}
        <div className="p-6 flex items-center space-x-3">
          <img src={logo} alt="DocuCare Logo" className="h-12 w-12" />
          <h2 className="text-2xl font-bold">DocuCare</h2>
        </div>

        {/* Navigation Links */}
        <nav className="flex-grow">
          <ul className="space-y-4 p-4">
            <li>
              <button
                className={`flex items-center space-x-3 w-full text-left hover:bg-[#1F4D66] p-3 rounded ${
                  activeComponent === 'patients' ? 'bg-[#1F4D66]' : ''
                }`}
                onClick={() => setActiveComponent('patients')}
              >
                <FontAwesomeIcon icon={faUsers} />
                <span>Manage Patients</span>
              </button>
            </li>
            <li>
              <button
                className={`flex items-center space-x-3 w-full text-left hover:bg-[#1F4D66] p-3 rounded ${
                  activeComponent === 'doctors' ? 'bg-[#1F4D66]' : ''
                }`}
                onClick={() => setActiveComponent('doctors')}
              >
                <FontAwesomeIcon icon={faUserMd} />
                <span>Manage Doctors</span>
              </button>
            </li>
            <li>
              <button
                className={`flex items-center space-x-3 w-full text-left hover:bg-[#1F4D66] p-3 rounded ${
                  activeComponent === 'appointments' ? 'bg-[#1F4D66]' : ''
                }`}
                onClick={() => setActiveComponent('appointments')}
              >
                <FontAwesomeIcon icon={faCalendarCheck} />
                <span>Appointments</span>
              </button>
            </li>
            <li>
              <button
                className={`flex items-center space-x-3 w-full text-left hover:bg-[#1F4D66] p-3 rounded ${
                  activeComponent === 'reports' ? 'bg-[#1F4D66]' : ''
                }`}
                onClick={() => setActiveComponent('reports')}
              >
                <FontAwesomeIcon icon={faChartBar} />
                <span>Reports</span>
              </button>
            </li>
            <li>
              <button
                className={`flex items-center space-x-3 w-full text-left hover:bg-[#1F4D66] p-3 rounded ${
                  activeComponent === 'billing' ? 'bg-[#1F4D66]' : ''
                }`}
                onClick={() => setActiveComponent('billing')}
              >
                <FontAwesomeIcon icon={faFileInvoiceDollar} />
                <span>Billing</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4">
          <button
            className="flex items-center space-x-3 w-full text-left hover:bg-[#1F4D66] p-3 rounded"
            onClick={handleLogout}
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Dynamic Component Rendering */}
        <div className="p-6">{renderComponent()}</div>
      </div>

      {/* Bottom Navigation for Small Devices */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#2C698D] text-white p-4 flex justify-around lg:hidden">
        <button onClick={() => setActiveComponent('patients')} className="flex flex-col items-center">
          <FontAwesomeIcon icon={faUsers} className="text-xl" />
          <span className="text-sm">Patients</span>
        </button>
        <button onClick={() => setActiveComponent('doctors')} className="flex flex-col items-center">
          <FontAwesomeIcon icon={faUserMd} className="text-xl" />
          <span className="text-sm">Doctors</span>
        </button>
        <button onClick={() => setActiveComponent('appointments')} className="flex flex-col items-center">
          <FontAwesomeIcon icon={faCalendarCheck} className="text-xl" />
          <span className="text-sm">Appointments</span>
        </button>
        <button onClick={() => setActiveComponent('reports')} className="flex flex-col items-center">
          <FontAwesomeIcon icon={faChartBar} className="text-xl" />
          <span className="text-sm">Reports</span>
        </button>
        <button onClick={() => setActiveComponent('billing')} className="flex flex-col items-center">
          <FontAwesomeIcon icon={faFileInvoiceDollar} className="text-xl" />
          <span className="text-sm">Billing</span>
        </button>
        <button onClick={handleLogout} className="flex flex-col items-center">
          <FontAwesomeIcon icon={faSignOutAlt} className="text-xl" />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;