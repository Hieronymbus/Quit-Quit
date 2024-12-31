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
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleLogin()
        
        }}
      >
        <label htmlFor="userNameEmailLogin">
          userName/email
          <input 
            type="text"
            name="userNameEmail"
            id='userNameEmailLogin' 
            value={loginDetails.userNameEmail}
            onChange={(e) => {setLoginDetails(prev => ({...prev, userNameEmail: e.target.value}));}}
          />
        </label>
        <label htmlFor="passwordLogin">
          password
          <input 
            type="password"
            name="password"
            id="passwordLogin" 
            value={loginDetails.password}
            onChange={(e) => {setLoginDetails(prev => ({...prev, password: e.target.value}));}}
          />
        </label>
        <button
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login