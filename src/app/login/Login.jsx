"use client"
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { login } from '../services/userServices'
import { useRouter } from 'next/navigation'
import UserContext from '@/context/userContext'

const Loginpage = () => {
  const router = useRouter();
  const context = useContext(UserContext);
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const loginSubmitted = async (event) => {
    event.preventDefault();

    if (loginData.email.trim() === '' || loginData.password.trim() === '') {
      toast.error("Invalid Data", {
        position: "top-center"
      });
      return;
    }

    try {
      const result = await login(loginData);
      console.log(result);
      toast.success("Logged in");

      context.setUser(result.user);
      router.push("/show-task");

    } catch (error) {
      toast.error("Error in login");
    }
  }

  const Reset = () => {
    setLoginData({
      email: "",
      password: ""
    });
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div className='grid justify-center flex-grow grid-cols-12 text-black'>
        <div className='col-span-10 col-start-2 p-6 rounded-lg'>
          <h1 className='mb-4 text-3xl text-center'>Login</h1>
          <form className='max-w-md p-6 mx-auto rounded-lg shadow-inner' onSubmit={loginSubmitted}>
            {/* email */}
            <div className='mt-5'>
              <label htmlFor='user_email' className='block mb-2 text-sm font-medium ps-3'>
                Email
              </label>
              <input
                type='email'
                className='w-full p-2.5 rounded-2xl text-black shadow-lg shadow-green-700'
                placeholder='Enter email' name='user_email' onChange={(event) => {
                  setLoginData({
                    ...loginData,
                    email: event.target.value
                  });
                }}
                value={loginData.email}
              />
            </div>

            {/* password field */}
            <div className='mt-5'>
              <label htmlFor='user_about' className='block mb-2 text-sm font-medium ps-3'>
                Password
              </label>
              <input
                type='password'
                className='w-full p-2.5 rounded-2xl text-black shadow-lg shadow-red-700'
                placeholder='Password' name='user_password' onChange={(event) => {
                  setLoginData({
                    ...loginData,
                    password: event.target.value
                  });
                }}
                value={loginData.password}
              />
              {/* buttons */}
              <div className='flex justify-between mt-14'>
                <button
                  type='reset'
                  className='px-4 py-2 text-black bg-gray-300 rounded-md hover:bg-gray-400'
                  onClick={Reset}
                >
                  Reset
                </button>
                <button
                  type='submit'
                  className='px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600'
                >
                  Signup
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
     
    </div>
  );
}

export default Loginpage;
