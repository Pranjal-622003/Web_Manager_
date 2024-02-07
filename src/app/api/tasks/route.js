
// create all the task
import { connectdb } from "@/helper/db";
import { Task } from "@/models/task"
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"


export async function POST(request) {
    const { title, content, userId, status } = await request.json();
      // fetching logged in user id
const authToken=request.cookies.get("authToken")?.value
const data=jwt.verify(authToken,process.env.JWT_KEY)
console.log(data._id)
  
    try {
      const task = new Task({
        title,
        content,
        status,
        userId:data._id,
        
      });
      await connectdb()
      const createdTask = await task.save();
      return NextResponse.json(createdTask, {
        status: 201,
      });
    } catch (error) {
      console.log(error);
      
      return NextResponse.json({
        message:"failed",
        success:false
      })
    }
  } 



// get all the tasks
export async function GET(requests){

  try {
    await connectdb()
    const tasks=await Task.find()
    return NextResponse.json(tasks)
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      message:"Can't find all tasks",
      status:202,
      success:false
    })
  }
}