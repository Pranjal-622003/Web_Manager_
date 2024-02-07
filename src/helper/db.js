import mongoose from "mongoose";
const config={
isConnected:0
}
export const connectdb=async()=>{ 
     // isConnected ka value agr 0 h t hi connection create hoga agr 1 hogaya tb connection created h to /
     //return kr jayega
    if(config.isConnected){
        return
    }
    try {
        
       const {connection}= await mongoose.connect(process.env.MONGO_DB_URL,{
            dbName:"Task_Manager"
        })
        console.log("db connected")
        // console.log(connection)
        config.isConnected=connection.readyState


// testing and creating user
// const user=new User({
//     name:'John Doe',
//     email: 'johndoe@gmail.com',
//     password:'123456'
// })

// await user.save()

// console.log("user is created")

    } catch (error) {
        console.log("Fail to connect with database")
        console.log(error)
    }
}