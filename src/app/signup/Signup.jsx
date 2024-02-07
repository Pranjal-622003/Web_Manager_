"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { signUp } from '../services/userServices';

const Signup = () => {
  const[data,setData]=useState({
    name:"",
    email:"",
    password:"",
    about:"",
    profileURL:"https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png",
  })
// function of reset after click on reset everthing is vanishes
  const Reset=()=>{
    setData({
      name:"",
      email: "",
      password:"",
      about:"",
      profileURL:"https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png",
    })
  }


  const doSignup=async (event)=>{
    event.preventDefault()
    console.log(event)

    // if email field is not filled by the user then form doesn't submit it return and from toastify it 
    //display error
    if(data.email===""||data.email==null){
      toast.error("email is required",{
        position:"top center"
      })     
      return 
    }

    //posting our singup details using axios which is in services file
    try {
      const result= await signUp(data)
      console.log(result)
      toast.success("user is registerd!!")

      setData({
        name:"",
        email: "",
        password:"",
        about:"",
        profileURL:"https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png",
      })
    } catch (error) {
      console.log(error)
      toast.error("signup error")
    }

  }
  return (
    <div className='grid grid-cols-12'>
      <div className='col-span-8 col-start-3 md:col-span-4 md:col-start-5'>
        <div className='py-5'>
          <div className='text-3xl text-center text-black'>Sign Up</div>
          <form action='' className='mt-5' onSubmit={doSignup}>
            {/* name field */}
            <div className='mt-3'>
              <label htmlFor='user_name' className='block mb-2 text-sm font-medium text-black ps-3'>
                Username
              </label>
              <input
                type='text'
                className='w-full p-2.5 rounded-2xl text-black shadow-lg shadow-blue-700'
                placeholder='Enter name' name='user_name' onChange={(event)=>{
                  setData({
                    ...data,
                    name:event.target.value
                  })
                }}
                value={data.name}
              />
            </div>
            {/* email */}
            <div className='mt-3'>
              <label htmlFor='user_email' className='block mb-2 text-sm font-medium text-black ps-3'>
                Email
              </label>
              <input
                type='email'
                className='w-full p-2.5 rounded-2xl text-black shadow-lg shadow-blue-700'
                placeholder='Enter email'name='user_email' onChange={(event)=>{
                  setData({
                    ...data,
                    email:event.target.value
                  })
                }}
                value={data.email}
              />
            </div>

            {/* password field */}
            <div className='mt-3'>
              <label htmlFor='user_about' className='block mb-2 text-sm font-medium text-black ps-3'>
                Password
              </label>
              <input
                type='password'
                className='w-full p-2.5 rounded-2xl text-black shadow-lg shadow-blue-700'
                placeholder='Password'name='user_password' onChange={(event)=>{
                  setData({
                    ...data,
                    password:event.target.value
                  })
                }}
                value={data.password}
              />
            </div>

            {/* user about */}
            <div className='mt-3'>
              <label htmlFor='user_about' className='block mb-2 text-sm font-medium text-black ps-3'>
                User About
              </label>
              <textarea
                className='w-full p-2.5 rounded-2xl text-black shadow-lg shadow-blue-700'
                placeholder='About'
                rows={5}name='user_about' onChange={(event)=>{
                  setData({
                    ...data,
                    about:event.target.value
                  })
                }}
                value={data.about}
              ></textarea>
            </div>

            {/* buttons */}
            <div className='flex justify-between mt-5'>
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

            {/* {JSON.stringify(data)} it is know how data is pprinting perfectly or not*/}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
