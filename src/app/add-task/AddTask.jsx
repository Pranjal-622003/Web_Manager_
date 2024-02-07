"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import { addTask } from '../services/taskServices';
import { toast } from 'react-toastify';

const AddTasks = () => {
  const[task,setTask]=useState({
    title:"",
    status:"",
    content:"",
    // for temporary
    userId:"65ad1c39c5b054e0687b2dbc",
  })
  const handleAddTask=async(event)=>{
    event.preventDefault()
    // validate task data
    try {
      const result=await addTask(task)
      console.log(result)
      toast.success("Your task is added"),{
        position:"top-centre"
      }
      // after your task added every field should automatically blank
      // to see this we use 

      setTask({
        title:"",
        content:"",
        status:"none",
      })

    } catch (error) {
      console.log(error)
      toast.error("Task not added"),{
        position:"top-centre"
      }
    }
  }

  const handleClear = () => {
    setTask({
      title: "",
      content: "",
      status: "none",
    });
  };
  return (
    <div className='grid justify-center grid-cols-12 text-black '>
      <div className='col-span-10 col-start-2 p-6 mt-6 rounded-lg'>
        <h1 className='mb-4 text-3xl text-center'>Add Your Task Here!!</h1>

        <form
          className='max-w-md p-6 mx-auto rounded-lg shadow-inner' onSubmit={handleAddTask}
        >
          <div className='mb-4'>
            <center>
              <Image src={'/image.jpg'} width={300} height={500} alt='nope' />
            </center>
          </div>

          {/* Task title */}
          <div className='mb-4'>
            <label htmlFor="task_title" className='block mb-2 text-sm font-medium'>
              Title
            </label>
            <input
              type="text"
              className='w-full p-2.5 rounded-2xl text-black ps-3'
              id='task_title' name='task_title' onChange={(event)=>{setTask({
                ...task,   //iska mtlb h sab samerhega content status userid bs title chane hoga
                title:event.target.value,
              })
            }}
            value={task.title}
            />
          </div>

          {/* Content title */}
          <div className='mb-4'>
            <label htmlFor="task_content" className='block mb-2 text-sm font-medium ps-3'>
              Content
            </label>
            <textarea
              className='w-full p-2.5 rounded-2xl text-black'
              id='task_content' rows={5} name='task_content' onChange={(event)=>{setTask({
                ...task,   //iska mtlb h sab same rhega status title userid bs content change hoga
                content:event.target.value,
              })
            }}
            value={task.content}
            />
          </div>

          {/* Drop-down menu with two options: pending and completed */}
          <div className='mb-4'>
            <label htmlFor="task_status" className='block mb-2 text-sm font-medium'>
              Status
            </label>
            <select
              className='w-full p-2.5 rounded-2xl text-black'
              id='task_status'name='task_status' onChange={(event)=>{setTask({
                ...task,   //iska mtlb h sab same rhega content title userid bs status change hoga
                status:event.target.value,
              })
            }}
            value={task.status}
            >
              <option value="none">---Select Status---</option>
              <option value='Pending'>Pending</option>
              <option value='Completed'>Completed</option>
            </select>
          </div>

          {/* Buttons */}
          <div className='text-center'>
            <button
              type='submit'
              className='px-4 py-2 mr-2 text-white bg-blue-500 rounded-full hover:bg-blue-600'
            >
              Add Task
            </button>
            <button
              type='button'
              className='px-4 py-2 text-white bg-red-500 rounded-full hover:bg-red-600'
              onClick={handleClear}
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTasks;
