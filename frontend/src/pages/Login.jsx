import React , {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../store/user.js'

const Login = () => {

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
      navigate("/personalDashboard")
    }
  }

  return (
    <div
      className='w-screen h-screen  flex flex-col justify-center items-center gap-3 bg-slate-800'
    >
      <form
        className='w-1/3 p-3 aspect-square rounded-xl text-gray-100  bg-slate-700 border-2 shadow-lg shadow-gray-50 flex flex-col items-center justify-around'
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
        <div>
          <button
            className='mr-10 p-4 border-4  border-gray-400 rounded-xl '
            type="submit"
          >
            Login
          </button>
          <button
            className=' p-4 border-4  border-gray-400 rounded-xl'
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