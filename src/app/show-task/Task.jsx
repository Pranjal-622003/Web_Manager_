import React from 'react';
import {RxCrossCircled} from "react-icons/rx"
const Task = ({ task,deleteTaskParent }) => {

  function deleteTask(taskId){
    deleteTaskParent(taskId)
  }
  return (
    <div className={`mt-2 rounded-md shadow-lg w-full sm:w-30 md:w-30 lg:w-50 xl:w-96 mx-auto ${task.status === "Completed" ? "bg-green-500" : "bg-red-500"}`}>
      <div className='p-5'>
        <div className='flex justify-between'>
        <h1 className='text-xl font-semibold sm:text-2xl md:text-3xl lg:text-3xl xl:text-3xl'>
          {task.title}
        </h1>
        <span onClick={()=>{
          deleteTask(task._id)
        }}className='cursor-pointer'>          
        <RxCrossCircled/>
        </span>
        </div>
        <p className='mt-2 text-sm font-normal sm:text-base md:text-lg lg:text-xl xl:text-2xl'>
          {task.content}
        </p>
        <div>
          <p className='mt-5 text-right'>Status: <span className='font-bold'>{task.status}</span></p>
        </div>
      </div>
    </div>
  );
};

export default Task;
