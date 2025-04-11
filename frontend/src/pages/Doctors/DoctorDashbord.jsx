import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faCalendarCheck,
  faSignOutAlt,
  faChartBar,
} from '@fortawesome/free-solid-svg-icons';
import { logo } from '../../assets';
import Appointments from './Appointments';
import PatientRecords from './PatientRecords';
import Reports from './Reports';

function DoctorDashboard() {
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
      case 'appointments':
        return <Appointments />;
      case 'patientRecords':
        return <PatientRecords />;
      case 'reports':
        return <Reports />;
      default:
        return (
          <div className="p-6 text-center">
            <h1 className="text-4xl font-bold text-[#2C698D] mb-6">
              Welcome to the Doctor Dashboard 🚀
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Manage your appointments, view patient records, and access reports efficiently.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              <div className="bg-white shadow-md rounded-lg p-4">
                <FontAwesomeIcon icon={faCalendarCheck} className="text-[#2C698D] text-3xl mb-2" />
                <h3 className="text-xl font-semibold text-gray-700">Appointments</h3>
                <p className="text-gray-500 text-sm">
                  View and manage your upcoming appointments.
                </p>
              </div>
              <div className="bg-white shadow-md rounded-lg p-4">
                <FontAwesomeIcon icon={faUser} className="text-[#2C698D] text-3xl mb-2" />
                <h3 className="text-xl font-semibold text-gray-700">Patient Records</h3>
                <p className="text-gray-500 text-sm">
                  Access and update patient medical records.
                </p>
              </div>
              <div className="bg-white shadow-md rounded-lg p-4">
                <FontAwesomeIcon icon={faChartBar} className="text-[#2C698D] text-3xl mb-2" />
                <h3 className="text-xl font-semibold text-gray-700">Reports</h3>
                <p className="text-gray-500 text-sm">
                  Analyze reports for better insights.
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
                  activeComponent === 'patientRecords' ? 'bg-[#1F4D66]' : ''
                }`}
                onClick={() => setActiveComponent('patientRecords')}
              >
                <FontAwesomeIcon icon={faUser} />
                <span>Patient Records</span>
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
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4">
          <button
            className="flex items-center space-x-3 w-full text-left p-3 rounded hover:bg-[#1F4D66]"
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
        <button onClick={() => setActiveComponent('appointments')} className="flex flex-col items-center">
          <FontAwesomeIcon icon={faCalendarCheck} className="text-xl" />
          <span className="text-sm">Appointments</span>
        </button>
        <button onClick={() => setActiveComponent('patientRecords')} className="flex flex-col items-center">
          <FontAwesomeIcon icon={faUser} className="text-xl" />
          <span className="text-sm">Patient Records</span>
        </button>
        <button onClick={() => setActiveComponent('reports')} className="flex flex-col items-center">
          <FontAwesomeIcon icon={faChartBar} className="text-xl" />
          <span className="text-sm">Reports</span>
        </button>
        <button onClick={handleLogout} className="flex flex-col items-center">
          <FontAwesomeIcon icon={faSignOutAlt} className="text-xl" />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
}

export default DoctorDashboard;

