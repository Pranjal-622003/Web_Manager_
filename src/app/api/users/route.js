import { connectdb } from "@/helper/db";
import { User } from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"


export async function GET(request) {
  let users = [];
  try {
    await connectdb()
    users = await User.find().select("-password");   //.select used to hide the password
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "failed to get users",
      success: false,
    });
  }

  return NextResponse.json(users);
}

export async function POST(request) {


  const { name, email, password, about, profileURL } = await request.json();

  console.log({ name, email, password, about, profileURL });



  const user = new User({
    name,
    email,
    password,
    about,
    profileURL,
  });

  try { 
    // using bcrypt to encrpt the password so that no one can analyze your password
    // using parseint because bcrypt salt which is save in env  file is string not a number
    user.password=bcrypt.hashSync(user.password,parseInt(process.env.BCRYPT_SALT))
    await connectdb()
    const createdUser = await user.save();
    const response = NextResponse.json(createdUser, {
      status: 201,
    });
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "failed to create user !!",
        status: false,
      },
      {
        status: 500,
      }
    );
  }

 
}


