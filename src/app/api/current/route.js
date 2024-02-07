import { NextResponse } from "next/server";
import jwt  from "jsonwebtoken";
import { User } from "@/models/user";
import { connectdb } from "@/helper/db";
export async function GET(request){
  const authToken=request.cookies.get("authToken")?.value
  console.log(authToken)
  const userData=jwt.verify(authToken,process.env.JWT_KEY)
  console.log(userData)
  await connectdb()
  const user=await User.findById(userData._id).select("-password")
  return NextResponse.json(user)
}
