import React, { useState } from 'react';

function RegisterForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Handle registration logic here
    console.log('Registration form data:', formData);

    // Clear form fields
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    });
  };

  return (
    <form className="max-w-sm mx-auto space-y-6" onSubmit={handleSubmit}>
      {/* First Name input */}
      <div>
        <label htmlFor="firstName" className="sr-only">
          First Name
        </label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          autoComplete="given-name"
          required
          value={formData.firstName}
          onChange={handleInputChange}
          placeholder="First Name"
          className="block w-full px-4 py-2 rounded-md bg-gray-100 border-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
        />
      </div>

      {/* Last Name input */}
      <div>
        <label htmlFor="lastName" className="sr-only">
          Last Name
        </label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          autoComplete="family-name"
          required
          value={formData.lastName}
          onChange={handleInputChange}
          placeholder="Last Name"
          className="block w-full px-4 py-2 rounded-md bg-gray-100 border-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
        />
      </div>

      {/* Email input */}
      <div>
        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email address"
          className="block w-full px-4 py-2 rounded-md bg-gray-100 border-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
        />
      </div>

      {/* Password input */}
      <div>
        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Password"
          className="block w-full px-4 py-2 rounded-md bg-gray-100 border-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
        />
      </div>

      {/* Submit button */}
      <div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-600"
        >
          Register
        </button>
      </div>
    </form>
  );
}

export default RegisterForm;
