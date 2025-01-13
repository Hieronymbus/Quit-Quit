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
      className='w-screen h-screen  flex flex-col justify-center items-center gap-3 bg-slate-800'
    > 
      <form 
        className='w-1/3 p-3 aspect-square rounded-xl text-gray-100  bg-slate-700 border-2 shadow-lg shadow-gray-50 flex flex-col items-center justify-between'
        onSubmit={ (e)=>{
          e.preventDefault()
           handleRegisterUser()
        } }
        > 
        <h2>
          Register Below
        </h2>
        <div
          className='h-1/2 flex flex-col gap-2 '
        >  
          <label htmlFor="email">
            Email:
          </label>
          <input 
            className='text-black'
            type="email" 
            id="email"
            name="email"
            value={newUser.email}
            onChange={(e)=>setNewUser({...newUser, email: e.target.value})}
          />
          <label htmlFor="userName">
            UserName:
          </label>
          <input 
            className='text-black'
            type="text"
            id="userName"
            name="userName" 
            value={newUser.userName}
            onChange={(e)=>setNewUser({...newUser, userName: e.target.value})}
          />
          <label htmlFor="password">
            Password:
          </label>
          <input 
            className='text-black'
            type="password"
            id="password" 
            name='password'
            value={newUser.password}
            onChange={(e)=>setNewUser({...newUser, password: e.target.value})} 
          />
          <label htmlFor="confirmationPassword">
            Confirm Password:
          </label>
          <input 
            className='text-black'
            type="password" 
            id="confirmationPassword" 
            name='confirmationPassword'
            value={newUser.confirmationPassword}
            onChange={(e)=>setNewUser({...newUser, confirmationPassword: e.target.value})}
          />
        </div>
        <div>

          <button
            className='mr-10 p-4 border-4  border-gray-400 rounded-xl'
            type='submit'
          >
            Register
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

export default Register