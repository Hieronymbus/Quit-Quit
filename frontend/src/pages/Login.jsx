import React , {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../store/user.js'

const Login = ({setSelectedQuit}) => {

  const [loginDetails, setLoginDetails] = useState({
    userNameEmail: "",
    password: ""
  })

  const navigate = useNavigate()
  const { loginUser } = useUserStore()
  
  const handleLogin = async () => {
    const {success, message} = await loginUser(loginDetails);

    if (!success) {
      alert(message)
    } else {
      alert(message)
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
        className='w-3/4 md:w-2/3 lg:w-1/3 p-3 aspect-square rounded-xl dark:text-gray-100 bg-slate-400 dark:bg-slate-700 border-2 shadow-lg shadow-black dark:shadow-gray-50 flex flex-col items-center justify-around'
        onSubmit={(e) => {
          e.preventDefault()
          handleLogin()
        }}
      >
        <h2
          className='text-2xl'
        >
          Login
        </h2>
        <div
          className='h-1/2 flex flex-col gap-2 '
        > 
          <label 
            className=''
            htmlFor="userNameEmailLogin"
          >
            userName/email:
          </label>
          <input 
            className='text-black'
            type="text"
            name="userNameEmail"
            id='userNameEmailLogin' 
            value={loginDetails.userNameEmail}
            onChange={(e) => {setLoginDetails(prev => ({...prev, userNameEmail: e.target.value}));}}
          />
          <label htmlFor="passwordLogin">
            password:
          </label>
          <input 
            className='text-black'
            type="password"
            name="password"
            id="passwordLogin" 
            value={loginDetails.password}
            onChange={(e) => {setLoginDetails(prev => ({...prev, password: e.target.value}));}}
          />
        </div>
        <div
          className='w-2/3 flex justify-around'
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