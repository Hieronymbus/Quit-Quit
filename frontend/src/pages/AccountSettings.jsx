import React, { useState } from 'react'
import Header from '../components/Header'
import { useUserStore } from '../store/user'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Overlay from '../components/Overlay'


const AccountSettings = ({darkMode, setDarkMode}) => {
    
    const { user, deleteUser } = useUserStore()
    const navigate = useNavigate()
    const [ isDeleteClicked, setIsDeleteClicked ] = useState(false)

    const handleDeleteUser = async () => {
       const {success, message} = await deleteUser(user.userDetails._id)

       if(success) {
        toast(message, {
            icon: "👋", 
            duration: 2000,
            position: "bottom-center", 
            style: {
              borderRadius: "8px",
              background: "#333",
              color: "#fff",
            },
          });
          navigate('/')
       }
       
    };

    return (
        <div
            className='w-full h-screen flex flex-col '
        >
            <Header setDarkMode={setDarkMode} darkMode={darkMode}/>
            <div
                className='h-full-minus-16 p-5 text-xl  bg-slate-200 dark:bg-slate-600 dark:text-slate-200'
            >
              <h1
                className='text-4xl text-blue-400 font-semibold'
              >
                View/Edit Account
              </h1>
                
                <div className="h-[calc(100%-4rem)] p-5 text-xl bg-slate-200 dark:bg-slate-600 dark:text-slate-200 space-y-6">
                  <div className="space-y-2 ">
                    <h2 className="font-semibold text-gray-700 dark:text-gray-300">Username</h2>
                    <div
                      className='flex gap-2'
                    >

                      <h3 className="text-gray-900 dark:text-gray-100 text-3xl">{user.userDetails.userName}</h3>
                      <button className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                      </svg>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2 ">
                    <h2 className="font-semibold text-gray-700 dark:text-gray-300">Email</h2>
                    <div
                      className='flex gap-2'
                    >
                      <h3 className="text-gray-900 dark:text-gray-100 text-3xl">{user.userDetails.email}</h3>
                      <button className=" p-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                      </svg>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2 ">
                    <h2 className=" font-semibold  text-gray-700 dark:text-gray-300">Would you like to change Password?</h2>
                    <button className=" inline p-2 bg-blue-600 text-white rounded hover:bg-blue-700">Change</button>
                  </div>

                  <div className="space-y-2">
                    <h2 className="font-semibold text-red-600 dark:text-red-400">
                      Want to delete your account?  
                    </h2>
                    <button
                      className=" p-2 bg-red-600 text-white rounded hover:bg-red-700"
                      onClick={() => setIsDeleteClicked(true)}
                    >
                      Click here
                    </button>
                  </div>
                </div>
                {
                    isDeleteClicked
                    &&
                    (   
                      <div>
                        <Overlay />
                        <div
                            className='z-50 h-fit w-11/12 sm:w-1/4 fixed inset-0 m-auto flex flex-col pt-2 pb-4 rounded-xl bg-slate-5000 dark:bg-slate-900 border-t-slate-500  '
                        > 
                          <h3
                            className='text-xl text-center'
                          >
                            Are you sure you want to delete your account? This action is permanent and cannot be undone.
                          </h3>
                          <div
                            className='mt-2 flex justify-center gap-2'
                          >
                            <button
                              className="w-1/3 text-lg p-2 rounded-3xl bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 shadow-md shadow-black transform transition-transform duration-150 hover:shadow-md hover:shadow-black active:shadow-sm hover:translate-y-0.5 active:translate-y-2" 
                              onClick={handleDeleteUser}
                            >
                                Yes
                            </button>
                            <button
                              className="w-1/3 text-lg p-2 rounded-3xl bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 shadow-md shadow-black transform transition-transform duration-150 hover:shadow-md hover:shadow-black active:shadow-sm hover:translate-y-0.5 active:translate-y-2" 
                              onClick={()=>setIsDeleteClicked(false)}
                            >
                                No
                            </button>
                          </div>
                        </div>
                      </div>
                      )
                }
            </div>
        </div>
  )
}

export default AccountSettings