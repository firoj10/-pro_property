import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logindummy = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Handles input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Refresh access token if expired
  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) return null;

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', { refresh: refreshToken });
      localStorage.setItem('access_token', response.data.access);
      return response.data.access;
    } catch (error) {
      console.error('Failed to refresh token:', error);
      return null;
    }
  };

  // Set up axios instance with access token
  const api = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    },
  });

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response.status === 401) {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return api(error.config);
        }
      }
      return Promise.reject(error);
    }
  );

  // Handles login form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', formData);
      console.log('Login response:', response.data);

      // Save tokens to localStorage
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);

      setIsLoggedIn(true);
      setMessage('Login successful!'); // Show success message
      navigate('/');  // Redirect on successful login
    } catch (error) {
      console.error('Login error:', error);
      // Display error message from API or generic message
      setMessage('Login failed: ' + (error.response?.data?.error || error.message || 'Unknown error'));
    }
  };

  return (
    <div className="pt-8 mt-[200px] mb-[160px]">
      <form onSubmit={handleLogin} className="max-w-sm mx-auto bg-white p-6 rounded-lg shadow-lg">
        {/* Username Input */}
        <div className="mb-5">
          <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Username"
            required
          />
        </div>

        {/* Password Input */}
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            />
          </div>
          <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Remember me
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Login
        </button>
      </form>

      {/* Show message after form submission */}
      {message && (
        <p className={`mt-4 text-center ${isLoggedIn ? 'text-green-500' : 'text-red-500'}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default Logindummy;
