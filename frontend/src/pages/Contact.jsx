import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'; // Import react-hot-toast
import { FiPhone, FiMail, FiMapPin, FiFacebook, FiTwitter, FiLinkedin, FiInstagram } from 'react-icons/fi';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Form Validation
  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Enter a valid email';
    if (!formData.message.trim()) newErrors.message = 'Message cannot be empty';
    return newErrors;
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true); // Start loading
    try {
      // Send data to the backend
      const response = await axios.post('http://localhost:3000/admin/message', formData);
      toast.success(response.data.message || 'Thank you! Your message has been sent.');
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to send message. Please try again.');
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="contact-page bg-gradient-to-r from-[#F5F9FA] to-[#E3EDF2] min-h-screen py-16">
      <Toaster /> {/* Add Toaster component */}
      <div className="container mx-auto px-6 lg:px-20">
        
        {/* Page Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#2C698D] mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600">Have questions? Feel free to reach out!</p>
        </motion.div>

        {/* Contact Form and Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          <motion.div
            className="bg-white p-8 shadow-lg rounded-lg"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-bold text-[#2C698D] mb-6">Send Us a Message</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Your Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#2C698D] focus:border-[#2C698D]"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Your Email</label>
                <input
                  type="email"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#2C698D] focus:border-[#2C698D]"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Your Message</label>
                <textarea
                  rows="4"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#2C698D] focus:border-[#2C698D]"
                  placeholder="Write your message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
                {errors.message && <p className="text-red-500 text-xs">{errors.message}</p>}
              </div>
              
              <button
                type="submit"
                className={`w-full font-bold py-2 px-4 rounded-lg transition duration-300 ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-[#2C698D] text-white hover:bg-[#1F4D66]'
                }`}
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>

          {/* Contact Details */}
          <motion.div
            className="bg-white p-8 shadow-lg rounded-lg"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-bold text-[#2C698D] mb-6">Get in Touch</h2>
            
            <ul className="space-y-4">
              <li className="flex items-center">
                <FiPhone className="text-[#2C698D] text-xl mr-4" />
                <a href="tel:+11234567890" className="text-gray-600 hover:underline">+1 (123) 456-7890</a>
              </li>
              <li className="flex items-center">
                <FiMail className="text-[#2C698D] text-xl mr-4" />
                <a href="mailto:support@docucare.com" className="text-gray-600 hover:underline">support@docucare.com</a>
              </li>
              <li className="flex items-center">
                <FiMapPin className="text-[#2C698D] text-xl mr-4" />
                <span className="text-gray-600">123 Healthcare Blvd, City, Country</span>
              </li>
            </ul>

            <div className="mt-8 flex space-x-4">
              {[FiFacebook, FiTwitter, FiLinkedin, FiInstagram].map((Icon, index) => (
                <a key={index} href="#" className="text-[#2C698D] text-xl hover:text-[#1F4D66] transition duration-300">
                  <Icon />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Contact;