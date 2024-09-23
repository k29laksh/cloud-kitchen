import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";

const Login = ({ toggleFormType, formType }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log('Form data submitted:', formData);
  };

  return (
    <div className="flex items-center font-Poppins justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded w-[480px]">
        <h2 className="text-4xl font-semibold text-center text-gray-800 m-2">
          {formType === 'login' ? 'Log In' : 'Sign Up'}
        </h2>
        <div className='py-6 flex flex-col'>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-lg">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder='Email'
              className="mt-1 block w-full px-3 py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-zinc-800 sm:text-lg"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-lg">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder='Password'
              className="mt-1 block w-full px-3 py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-zinc-800 sm:text-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 px-4 rounded-md hover:bg-orange-600 text-lg my-6"
          >
            {formType === 'login' ? 'Log In' : 'Sign Up'}
          </button>

          <div className='flex items-center justify-between '>
            <div className='w-[45%] h-[1px] bg-gray-300'></div>
            <div className='text-gray-800 text-lg'>Or</div>
            <div className='w-[45%] h-[1px] bg-gray-300'></div>
          </div>

          <button
            type="button"
            className="w-full bg-zinc-800 text-white py-3 px-4 rounded-md hover:bg-zinc-900 text-lg my-6 flex items-center gap-2 justify-center"
          >
            <FcGoogle size={26} />
            {formType === 'login' ? 'Log In' : 'Sign Up'} with Google
          </button>

          <p className='text-lg'>
            {formType === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
            <span className='text-orange-500 font-medium cursor-pointer' onClick={toggleFormType}>
              {formType === 'login' ? 'Sign up' : 'Log in'}
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
