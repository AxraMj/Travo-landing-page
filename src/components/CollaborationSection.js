import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { FaUsers } from 'react-icons/fa';

export default function CollaborationSection() {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  // Replace with your real public key:
  const EMAILJS_PUBLIC_KEY = 'DOLzZgwQiahD7NcDW';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await emailjs.sendForm(
        'service_mawdg6i',
        'template_9mqd7qs',
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );

      console.log('EmailJS result:', result);
      
      if (result.text === 'OK') {
        alert('Thank you for reaching out! We will get back to you soon.');
        formRef.current.reset();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full flex flex-col items-center py-16 bg-gradient-to-b from-gray-900 to-gray-800 px-4">
      <div className="flex flex-col md:flex-row gap-10 w-full max-w-4xl items-center">
        {/* Illustration */}
        <div className="flex flex-col items-center md:items-start md:w-1/2 mb-8 md:mb-0">
          <FaUsers size={80} className="text-blue-400 mb-4" />
          <h2 className="text-3xl font-bold text-white mb-2">Let's Collaborate!</h2>
          <p className="text-gray-300 text-lg text-center md:text-left max-w-xs">
            Get in touch to collaborate or partner with us. We love working with creative minds!
          </p>
        </div>
        {/* Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="bg-gray-900 bg-opacity-80 rounded-2xl shadow-xl border border-gray-700 p-8 flex flex-col gap-6 w-full md:w-1/2"
        >
          {error && (
            <div className="bg-red-500 text-white p-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          <label className="flex flex-col">
            <span className="text-white font-medium mb-2">Your Name</span>
            <input
              type="text"
              name="from_name"
              placeholder="What's your name?"
              className="bg-gray-800 py-3 px-4 placeholder:text-gray-400 text-white rounded-lg outline-none border-none font-medium"
              required
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-2">Your Email</span>
            <input
              type="email"
              name="from_email"
              placeholder="What's your email address?"
              className="bg-gray-800 py-3 px-4 placeholder:text-gray-400 text-white rounded-lg outline-none border-none font-medium"
              required
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-2">Your Message</span>
            <textarea
              rows={5}
              name="message"
              placeholder="How would you like to collaborate?"
              className="bg-gray-800 py-3 px-4 placeholder:text-gray-400 text-white rounded-lg outline-none border-none font-medium"
              required
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </section>
  );
} 