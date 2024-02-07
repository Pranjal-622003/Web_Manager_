"use client"
import React, { useEffect, useState } from 'react'
import UserContext from './userContext'
import { currentUser } from '@/app/services/userServices'

const UserProvider = ({children}) => {
    const[user,setUser]=useState(undefined)

    useEffect(()=>{
        async function load(){
            try {
           const user= await currentUser();
           console.log(user)
            setUser({...user})
            } catch (error) {
                console.log(error)
                setUser(undefined)
            }
        }
        // 
      
            load()
        
       
    },[])
  return (
   <UserContext.Provider value={{user,setUser}}>
    {children}
   </UserContext.Provider>
  )
}

export default UserProvider
