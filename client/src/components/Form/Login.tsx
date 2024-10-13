"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { FcGoogle } from "react-icons/fc";

interface LoginProps {
  toggleFormType: () => void;
  formType: 'login' | 'signup';
}

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC<LoginProps> = ({ toggleFormType, formType }) => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Handle form submission logic
    console.log('Form data submitted:', formData);
  };

  return (
    <div className="flex items-center font-Poppins justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded w-[340px]">
        <h2 className="text-3xl font-semibold text-center text-gray-800 m-2">
          {formType === 'login' ? 'Log In' : 'Sign Up'}
        </h2>
        <div className='py-4 flex flex-col'>
          <div className="mb-3">
            <label htmlFor="email" className="block text-gray-700 ">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder='Email'
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-zinc-800"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 ">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder='Password'
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-zinc-800"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 font-sm text-white py-2 px-4 rounded-md hover:bg-orange-600  my-3"
          >
            {formType === 'login' ? 'Log In' : 'Sign Up'}
          </button>

          <div className='flex items-center justify-between '>
            <div className='w-[45%] h-[1px] bg-gray-300'></div>
            <div className='text-gray-800 '>Or</div>
            <div className='w-[45%] h-[1px] bg-gray-300'></div>
          </div>

          <button
            type="button"
            className="w-full bg-zinc-800 text-white text-sm py-2 px-4 rounded-md hover:bg-zinc-900  my-4 flex items-center gap-2 justify-center"
          >
            <FcGoogle size={24} />
            {formType === 'login' ? 'Log In' : 'Sign Up'} with Google
          </button>

          <p className=''>
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
