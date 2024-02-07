"use client";
import UserContext from "@/context/userContext";
import React, { useContext, useEffect, useState } from "react";
import Task from "./Task";
import { deleteTasks, getTaskOfUser } from "../services/taskServices";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ShowTasks = () => {
  const [tasks, setTasks] = useState([]);
  const context = useContext(UserContext);

  async function loadTasks(userId) {
    try {
      const tasks = await getTaskOfUser(userId);
      setTasks([...tasks].reverse());
      console.log(tasks);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (context.user) {
      loadTasks(context.user._id);
    }
  }, [context.user]);

  async function deleteTaskParent(taskId) {
    try {
      // Show a confirmation dialog using SweetAlert
      const { isConfirmed } = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this task!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
      });
  
      if (isConfirmed) {
        // User clicked "Yes"
        const result = await deleteTasks(taskId);
        console.log(result);
  
        // Update state and show success message
        const newTask = tasks.filter(item => item._id !== taskId);
        setTasks(newTask);
        toast("Your task is deleted!!");
      } else {
        // User clicked "Cancel" or closed the dialog
        toast("Task deletion canceled!");
      }
    } catch (error) {
      console.log(error);
      toast("Error in deleting task!!");
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="grid flex-grow grid-cols-1 md:grid-cols-12 ">
        <div className="col-span-12 md:col-span-6 md:col-start-4">
          <h1 className="mt-3 mb-6 text-2xl text-center md:text-3xl lg:text-4xl text-stone-950">Your tasks!!</h1>

          {tasks.map((task) => (
            <Task task={task} key={task._id} deleteTaskParent={deleteTaskParent}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowTasks;
