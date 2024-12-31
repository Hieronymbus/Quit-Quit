import React, {useState} from 'react'
import { useUserStore } from '../store/user.js'
import { useNavigate } from 'react-router-dom'

const Register = () => {

  const [newUser, setNewUser] = useState({
    userName: "",
    email: "",
    password: "",
    confirmationPassword: ""
  })
  const navigate = useNavigate()
  const {registerUser, user} = useUserStore();

  const handleRegisterUser = async () => {
      const {success, message} = await registerUser(newUser)
      if(!success){
        alert(message)
      } else {
        alert(message)
        setNewUser(
          {
            userName: "",
            email: "",
            password: "",
            confirmationPassword: ""
          }
        )
        navigate("/login")
      }
  };

  return (
    <div 
      className='h-screen w-screen flex justify-center items-center'
    >
      <form 
        onSubmit={ (e)=>{
          e.preventDefault()
           handleRegisterUser()
        } }
        className='h-1/2 w-1/2 flex flex-col justify-center items-center gap-3 border border-black'
      >
        <label htmlFor="email">
          Email
          <input 
            className='bg-slate-400'
            type="email" 
            id="email"
            name="email"
            value={newUser.email}
            onChange={(e)=>setNewUser({...newUser, email: e.target.value})}
           />
        </label>
        <label htmlFor="userName">
          UserName
          <input 
            className='bg-slate-400'
            type="text"
            id="userName"
            name="userName" 
            value={newUser.userName}
            onChange={(e)=>setNewUser({...newUser, userName: e.target.value})}
          />
        </label>
        <label htmlFor="password">
          Password
          <input 
            className='bg-slate-400'
            type="password"
            id="password" 
            name='password'
            value={newUser.password}
            onChange={(e)=>setNewUser({...newUser, password: e.target.value})} 
          />
        </label>
        <label htmlFor="confirmationPassword">
          Confirm Password
          <input 
            className='bg-slate-400'
            type="password" 
            id="confirmationPassword" 
            name='confirmationPassword'
            value={newUser.confirmationPassword}
            onChange={(e)=>setNewUser({...newUser, confirmationPassword: e.target.value})}
          />
        </label>
        <button
          className='bg-blue-700 rounded p-2'
          type='submit'
        >
          Register
        </button>
      </form>
      
    </div>
  )
}

export default Register