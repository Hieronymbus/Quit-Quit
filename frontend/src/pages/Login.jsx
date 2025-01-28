import React , {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { useUserStore } from '../store/user.js';

const Login = ({setSelectedQuit}) => {

  const [loginDetails, setLoginDetails] = useState({
    userNameEmail: "",
    password: ""
  })

  const navigate = useNavigate()
  const { loginUser, fetchUser } = useUserStore()
  
  const handleLogin = async () => {
    const {success, message} = await loginUser(loginDetails);

    if (success === false) {
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
      console.log('userlogin fail')
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
      setLoginDetails(
        {
          userNameEmail: "",
          password: ""
        }
      )
      
      navigate("/home")
    }
  }
  useEffect(()=>{

    localStorage.removeItem('selectedQuit')
    setSelectedQuit("")
  })
  return (
    <div
      className='w-screen h-screen  flex flex-col justify-center items-center gap-3 bg-slate-500 dark:bg-slate-800'
    > 
      <form
        className='w-11/12 md:w-2/3 lg:w-1/3 p-3 aspect-square rounded-xl dark:text-gray-100 bg-slate-400 dark:bg-slate-700 border-2 shadow-lg shadow-black dark:shadow-gray-50 flex flex-col items-center '
        onSubmit={(e) => {
          e.preventDefault()
          handleLogin()
        }}
      >
        <h2
          className='text-3xl my-12'
        >
          Sign in
        </h2>
        <div
          className='w-3/4 flex flex-col gap-2 '
        > 
          <label 
            className='text-xl'
            htmlFor="userNameEmailLogin"
          >   
          </label>
          <input 
            className='w-full p-2  rounded-lg text-black'
            type="text"
            placeholder='Username/email'
            name="userNameEmail"
            id='userNameEmailLogin' 
            value={loginDetails.userNameEmail}
            onChange={(e) => {setLoginDetails(prev => ({...prev, userNameEmail: e.target.value}));}}
          />
          <label 
            className='text-xl'
            htmlFor="passwordLogin"
          >
          </label>
          <input 
            className='p-2 mb-5 rounded-lg text-black'
            type="password"
            placeholder='Password'
            name="password"
            id="passwordLogin" 
            value={loginDetails.password}
            onChange={(e) => {setLoginDetails(prev => ({...prev, password: e.target.value}));}}
          />
        </div>
        <div
          className=' w-3/4 mb-12 flex flex-col gap-4'
        >
          <button
            className="text-xl p-3 rounded-3xl bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 shadow-lg shadow-black transform transition-transform duration-150 hover:shadow-md hover:shadow-black active:shadow-sm hover:translate-y-0.5 active:translate-y-2"
            type="submit"
          >
            Login
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

export default Login