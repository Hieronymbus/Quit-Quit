import React, {useState,useEffect} from 'react'
import { useUserStore } from '../store/user.js'
import { useNavigate } from 'react-router-dom'
import toast from "react-hot-toast";
const Register = ({setSelectedQuit}) => {

  const [newUser, setNewUser] = useState({
    userName: "",
    email: "",
    password: "",
    confirmationPassword: ""
  })
  const navigate = useNavigate()
  const {registerUser, loginUser, user, fetchUser} = useUserStore();

  const handleRegisterUser = async () => {
      const {success, message} = await registerUser(newUser)
      if(!success){
        toast(message, {
          icon: "❌", // Custom icon for failure
          duration: 3000, 
          position: "bottom-center",
          style: {
            borderRadius: "8px",
            background: "#f8d7da", // Light red background
            color: "#721c24", // Dark red text
            border: "1px solid #f5c6cb", // Red border
          },
        });
      } else {
        toast(message, {
          icon: "👏", 
          duration: 3000,
          position: "bottom-center", 
          style: {
            borderRadius: "8px",
            background: "#333",
            color: "#fff",
          },
        });
        const loginDetails ={
          userNameEmail: newUser.email,
          password: newUser.password
        }
        await loginUser(loginDetails)
        setNewUser(
          {
            userName: "",
            email: "",
            password: "",
            confirmationPassword: ""
          }
        )
        
        navigate("/home")
      }
  };
  useEffect(()=>{

    localStorage.removeItem('selectedQuit')
    setSelectedQuit("")
  })
  return (

    <div 
      className='w-screen h-screen flex flex-col justify-center items-center gap-3 bg-slate-500 dark:bg-slate-800'
    > 
      <form 
        className='w-11/12 md:w-2/3 lg:w-1/3  p-3 aspect-square rounded-xl  dark:text-gray-100 bg-slate-400 dark:bg-slate-700 border-2 shadow-lg shadow-black dark:shadow-gray-50 flex flex-col items-center '
        onSubmit={ (e)=>{
          e.preventDefault()
           handleRegisterUser()
        } }
      > 
        <h2
          className='text-3xl my-12'
        >
          Sign Up
        </h2>
        <div
          className='h-1/2 w-3/4 flex flex-col gap-2 '
        >  
          <label htmlFor="email">
          </label>
          <input 
            className='p-2  rounded-lg text-black'
            placeholder='Email'
            type="email" 
            id="email"
            name="email"
            value={newUser.email}
            onChange={(e)=>setNewUser({...newUser, email: e.target.value})}
          />
          <label htmlFor="userName">
          </label>
          <input 
            className='p-2 rounded-lg text-black'
            placeholder='Username'
            type="text"
            id="userName"
            name="userName" 
            value={newUser.userName}
            onChange={(e)=>setNewUser({...newUser, userName: e.target.value})}
          />
          <label htmlFor="password">
            
          </label>
          <input 
            className='p-2 rounded-lg text-black'
            placeholder='Password'
            type="password"
            id="password" 
            name='password'
            value={newUser.password}
            onChange={(e)=>setNewUser({...newUser, password: e.target.value})} 
          />
          <label htmlFor="confirmationPassword">
            
          </label>
          <input 
            className='p-2 mb-5 rounded-lg text-black'
            placeholder='Confirm password'
            type="password" 
            id="confirmationPassword" 
            name='confirmationPassword'
            value={newUser.confirmationPassword}
            onChange={(e)=>setNewUser({...newUser, confirmationPassword: e.target.value})}
          />
        </div>
        <div
          className='w-3/4 mb-14 flex flex-col gap-4 '
        >
          <button
            className="text-xl p-3 rounded-3xl bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 shadow-lg shadow-black transform transition-transform duration-150 hover:shadow-md hover:shadow-black active:shadow-sm hover:translate-y-0.5 active:translate-y-2"

            type='submit'
          >
            Register
          </button>
          <button
            className="text-xl p-3 rounded-3xl bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 shadow-lg shadow-black transform transition-transform duration-150 hover:shadow-md hover:shadow-black active:shadow-sm hover:translate-y-0.5 active:translate-y-2"

            type='button'
            onClick={() => {navigate('/')}}
          >
            Cancel
          </button>
        </div>
      </form>
      
    </div>
  )
}

export default Register