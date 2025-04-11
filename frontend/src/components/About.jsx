import React from 'react';
import { motion } from 'framer-motion';
import { image1 } from '../assets';

function About() {
  return (
    <div className="py-16 bg-gradient-to-r from-[#F5F9FA] to-[#E3EDF2]">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
        {/* Image Section */}
        <motion.div
          className="w-full lg:w-1/2 mb-8 lg:mb-0 flex justify-center lg:justify-start"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <img
            src={image1}
            alt="About DocuCare"
            className="w-full sm:w-3/4 h-auto rounded-lg hover:shadow-2xl transition-shadow duration-300"
          />
        </motion.div>

        {/* Text Section */}
        <motion.div
          className="w-full lg:w-1/2 text-center lg:text-left"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2C698D] leading-tight">
              Welcome to <span className="text-[#5EBEC4]">DocuCare</span>
            </h2>
            <p className="mt-4 text-lg sm:text-xl text-[#333333] font-medium">
              A Comprehensive Solution for Modern Healthcare
            </p>
          </div>
          <div className="max-w-2xl mx-auto lg:mx-0">
            <p className="text-[#555555] mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
              At <span className="text-[#2C698D] font-semibold">DocuCare</span>, we provide top-notch medical care with a patient-centered approach. Our state-of-the-art facilities and experienced professionals ensure you receive the best treatment.
            </p>
            <p className="text-[#555555] mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
              We offer a wide range of services including general medicine, specialized treatments, and emergency care. Our commitment to innovation ensures you have access to the latest medical advancements.
            </p>
            <motion.button
              className="bg-gradient-to-r from-[#2C698D] to-[#5EBEC4] hover:from-[#1F4E79] hover:to-[#4597B5] text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-transform duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }} onClick={() => window.location.href = '/about'}
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default About;