"use client"
import React, { useContext, useState } from 'react';
import Link from 'next/link';
import UserContext from '@/context/userContext';
import { logout } from '@/app/services/userServices';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
const ResponsiveNavbar = () => {
  const router=useRouter();
  const context=useContext(UserContext)
  console.log(context)

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };


  async function doLogout(){
    try {
      const result=await logout()
      console.log(result)
      context.setUser(undefined)

      // redirect 
      router.push("/")
    } catch (error) {
      console.log(error)
      toast.error("Error in Logout")
    }
  }

  return (
    <nav className="relative p-4 text-white bg-gradient-to-r from-blue-700 via-purple-800 to-purple-300">
      <div className="container flex items-center justify-between mx-auto">
        {/* Left side: Work Manager */}
        <div className="text-2xl font-semibold">
          <Link href="/" className="text-white">Work Manager</Link>
        </div>

        {/* Responsive navigation menu for small screens */}
        <div className="relative md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            ☰
          </button>
          {menuOpen && (
            <div className="absolute top-0 right-0 p-4 mt-8 border border-white bg-gradient-to-r from-blue-700 via-purple-800 to-purple-300">
              {
                context.user &&(
                  <>
              <Link href="/add-task" className="block py-2 text-white hover:text-gray-300">Add Task</Link>
              <Link href="/show-task" className="block py-2 text-white hover:text-gray-300">Show Tasks</Link>
              <button onClick={doLogout} className="block py-2 text-white hover:text-gray-300">Logout</button>
              <Link href={"#"} className="block py-2 text-white hover:text-gray-300">{context.user.name}</Link>
                  </>
                )
              }
              {
                !context.user && (
                  <>              
              <Link href="/signup" className="text-white hover:text-gray-300">Sign Up</Link>
                      
              <Link href="/login" className="text-white hover:text-gray-300">Login</Link></>
                )
              }
              
              
            </div>
          )}
        </div>

        {/* Links visible on larger screens */}
        <div className="flex-1 hidden md:flex md:items-center md:justify-center">
         {
          context.user &&(
            <>
             <ul className="flex md:space-x-4 md:space-y-0">
            <li>
              <Link href="/add-task" className="text-white hover:text-gray-300">Add Task</Link>
            </li>
            <li>
              <Link href="/show-task" className="text-white hover:text-gray-300">Show Tasks</Link>
            </li>
          </ul>
            </>
          )
         }
        </div>

        {/* Sign Up and Login links */}
        <div className="hidden md:flex md:items-center">
          {
            context.user &&(
              <>
              <ul className="flex md:space-x-4 md:space-y-0">
            <li>
              <button onClick={doLogout} className="text-white hover:text-gray-300">Logout</button>
            </li>
            <li>
              <Link href={"#"} className="text-white hover:text-gray-300">{context.user.name}</Link>
            </li>
          </ul>
          </>
            )
          }
          {
            !context.user &&(
              <>
              <ul className="flex md:space-x-4 md:space-y-0">
            <li>
              <Link href="/signup" className="text-white hover:text-gray-300">Signup</Link>
            </li>
            <li>
              <Link href="/login" className="text-white hover:text-gray-300">Login</Link>
            </li>
          </ul>
          </>
            )
          }
        </div>
      </div>
    </nav>
  );
};

export default ResponsiveNavbar;