import React, {useEffect, useState} from 'react';
import {  useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { useUserStore } from '../store/user.js';
import { useAddictionStore } from '../store/addiction.js';
import { useQuitStore } from '../store/quit.js';
import VideoRecorder from '../components/VideoRecorder.jsx';
import Header from '../components/Header.jsx';
import DateTimePicker from '../components/DateTimePicker.jsx';


const AddQuit = ({setDarkMode, darkMode}) => {
  const navigate = useNavigate();
  const {user} = useUserStore();
  const {addictionsArr, fetchAddictions} = useAddictionStore();
  const {createQuit, fetchQuits, quits} = useQuitStore();
  const [mode, setMode] = useState("")
  const [newQuit, setNewQuit] = useState({
      userID: user.userDetails._id,
      addictionTypeID:"",
      startDate:"",
      endDate:"",
      usageParameters:{},
      minsOrHours:"minutes",
      reasonsToQuit:"",
      videoFile: null,
      status: "active"
  });
  const [addictionChoiceParameters, setAddictionChoiceParameters] = useState([]);
  const [filteredAddictionsArr, setFilteredAddictionsArr] = useState([])
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      fetchAddictions();
  }, [])
  // console.log("plane",addictionsArr)

  useEffect(()=>{
    
    fetchQuits(user.userDetails._id)
    
  },[fetchQuits])
  

  useEffect(()=>{
    let filteredArr 
    let mappedArr
    if(quits){
      filteredArr = quits.filter((quit, index) => {
        return quit.status != 'abandoned'
      })
      mappedArr = filteredArr.map(quit => {
        return quit.addictionTypeID._id
      })
    }
    // console.log("mapped", mappedArr)
    setFilteredAddictionsArr( addictionsArr.filter(addiction => {
      return !mappedArr.includes(addiction._id)
    }))
    
  },[quits,addictionsArr])


  useEffect(() => {
    if(newQuit.addictionTypeID){
      const choice = addictionsArr.find(addiction => addiction._id === newQuit.addictionTypeID)
      setAddictionChoiceParameters(choice.usageParameters)
    }
  }, [newQuit.addictionTypeID])

  function setDates(value) {
    // Parse the start date from input (this will be in the format "YYYY-MM-DDTHH:mm")
    const newStartDate = new Date(value); 
    
    // Create a new end date by copying the start date
    const newEndDate = new Date(newStartDate);
    
    // Add 6 months to the end date
    newEndDate.setMonth(newStartDate.getMonth() + 6);
    
    // Adjust the end date if the day doesn't match between the start and end months (for overflow)
    if (newEndDate.getDate() !== newStartDate.getDate()) {
      newEndDate.setDate(0); // Set to the last valid day of the month
    }
  
    // Update the state with both start and end dates
    setNewQuit((prev) => ({
      ...prev,
      startDate: newStartDate,
      endDate: newEndDate,
    }));
  }
  

  // async function handleAddQuit(e) {
  //   e.preventDefault()
  //   console.log(newQuit.videoFile)
  //   const {success, message} = await createQuit(newQuit)
  //   console.log(message)
    
    
  //   if(success) {
  //     toast(message, {
  //       icon: "👏", // Custom icon
  //       duration: 4000,
  //       position: "bottom-center", 
  //       style: {
  //         borderRadius: "8px",
  //         background: "#333",
  //         color: "#fff",
  //       },
  //     });

  //     // navigate("/personalDashboard")
  //     window.location = "/home"
  //     window.location()
  //   } else {
  //     toast(message, {
  //       icon: "❌", // Custom icon for failure
  //       duration: 4000,
  //       position: "bottom-center", 
  //       style: {
  //         borderRadius: "8px",
  //         background: "#f8d7da", // Light red background
  //         color: "#721c24", // Dark red text
  //         border: "1px solid #f5c6cb", // Red border
  //       },
  //     });
  //   }
  // }
  

async function handleAddQuit(e) {
  e.preventDefault();
  setLoading(true);

  try {
    // console.log(newQuit.videoFile);
    const { success, message } = await createQuit(newQuit);
    // console.log(message);

    if (success) {
      toast(message, {
        icon: "👏", 
        duration: 4000,
        position: "bottom-center",
        style: {
          borderRadius: "8px",
          background: "#333",
          color: "#fff",
        },
      });

      window.location = "/home";
      window.location();
    } else {
      toast(message, {
        icon: "❌", 
        duration: 4000,
        position: "bottom-center",
        style: {
          borderRadius: "8px",
          background: "#f8d7da", 
          color: "#721c24", 
          border: "1px solid #f5c6cb", 
        },
      });
    }
  }  finally {
    setLoading(false);
  }
}

  return (
    <div
        className='h-screen'
    > 
      <Header darkMode={darkMode} setDarkMode={setDarkMode}/>
      <div
        className='p-5 w-screen h-full-minus-16 flex flex-col justify-start items-center bg-slate-200 overflow-y-auto no-scrollbar dark:bg-slate-600 dark:text-slate-100'
      >
          <form 
            onSubmit={handleAddQuit} 
            className=' sm:w-1/2 p-4 flex flex-col gap-3'
          > 
            <h1
              className='text-blue-600 dark:text-blue-400 text-2xl font-bold'
            >
              Create a new Quit
            </h1>
            <div>
              <label htmlFor="addictionSelect" className="block text-lg font-medium  mb-1">
                  Select Addiction you wish to quit
              </label>
              <select
                  id="addictionSelect"
                  onChange={(e) => { setNewQuit(prev => ({ ...prev, addictionTypeID: e.target.value })) }}
                  value={newQuit.addictionTypeID}
                  className="block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 dark:text-slate-700"
              >
                  <option value="" disabled>
                      -- Select an option --
                  </option>
                  {filteredAddictionsArr.sort((a, b) => a.name.localeCompare(b.name)).map((addiction, index) => {
                    // if(addiction.status != "active" || addiction.status != "completed")
                      return (
                          <option value={addiction._id} key={index}>
                              {addiction.name}
                          </option>
                      );
                  })}
              </select>
            </div>
            {
              newQuit.addictionTypeID
              &&
              (
               
                <div>
                  <label htmlFor='startDateInput' className="block text-lg font-medium  mb-1">
                      Choose a Start Date/time
                  </label>
                  <DateTimePicker 
                    onChange={setDates}
                  />
                </div>
              )
            }
           
            { 
              newQuit.addictionTypeID
              &&
              <div>
                <h2
                  className='text-2xl font-bold mt-4 mb-2 text-blue-600 dark:text-blue-400'
                >
                  Usage breakdown
                </h2>
                {
                  addictionChoiceParameters.map((parameter, index) => {
                    const nameSplit = parameter.name.split(' ');
                    const name = nameSplit[0];
                    return  <div
                              key={index}
                            >
                              <label
                                htmlFor={`parameter${index + 1}`}
                                className='block w-full text-lg font-medium  mb-1 mt-2'
                                
                              >
                              {parameter.name}
                              </label>
                              <div
                                className='w-full flex justify-between'
                              >
    
                                <input 
                                  className={`${index == 2 ? "inline w-4/6" : "block w-full"}  p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 dark:text-slate-700`}
                                  type={parameter.type}
                                  id={`parameter${index + 1}`}
                                  step="0.01"
                                  min="0"
                                  onChange={(e) =>
                                    setNewQuit(prev => ({...prev, usageParameters:{...prev.usageParameters, [name]: e.target.value }}))
                                  }
                                />
                                {
                                  index == 2
                                  &&
                                  <select
                                    id="timeUnitSelect"
                                    onChange={(e) => { setNewQuit(prev => ({ ...prev, minsOrHours: e.target.value })) }}
                                    value={newQuit.minsOrHours}
                                    className="inline p-2 ml-1 w-2/5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 dark:text-slate-700"
                                  > 
                                    
                                    <option
                                      value="minutes"
                                    >
                                      Mins
                                    </option>
                                    <option
                                      value="hours"
                                    >
                                      Hours
                                    </option>
                                  </select>
                                }
                              </div>
                            </div> 
                  })
                }
              </div>            
            }          
            {
              newQuit.addictionTypeID
              &&
              (
                <div
                  className=' flex flex-col '
                > 
                  <h2
                    className='text-2xl font-bold mt-4 mb-2 text-blue-600 dark:text-blue-400'
                  >
                    Motivation
                  </h2>
                  <div>
                    <label
                      className='block text-lg font-medium  mb-1'
                      htmlFor='textReasonsTextArea'
                    >
                      Reasons for quiting 
                    </label>
                    <textarea
                      className='block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 dark:text-slate-700'
                      id='textReasonsTextArea'
                      onChange={(e) => {setNewQuit(prev => ({...prev, reasonsToQuit: e.target.value }))}}
                      value={newQuit.reasonsToQuit}
                    >
                    </textarea>
                  </div>
                  
                  {                   
                    <div>
                      <label
                        className='block w-full text-lg font-medium  mb-1 mt-2'
                        htmlFor='modeSelect'
                      >
                        Would you like to upload or record a video message for yourself? 
                        This can serve as a reminder of why you’re making this change in your life. 
                      </label>
                      <select
                        className='block w-full p-2 pt-2.5 pb-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 dark:text-slate-700'
                        id='modeSelect'
                        onChange={(e) => {
                          setMode(e.target.value)
                          setNewQuit(prev => ({ 
                            ...prev, 
                            videoFile: null 
                          }));                    
                        }}
                        value={mode}
                      >
                        <option value='skip'>Skip</option>
                        <option value="upload">Upload</option>
                        <option value='record'>Record</option>
                      </select>
                    </div>
                  }
                  {
                    mode == 'skip'
                    &&
                    <div></div> 
                  }
                  {
                    mode == 'upload' 
                    &&
                    <div>
                      <label 
                        className='block w-full text-lg font-medium my-1 '
                        htmlFor="fileUploadInput"
                      >
                        Choose video file from device to upload   
                      </label>  
                      <input 
                        className='block w-full p-2 pt-2.5 pb-2.5 border bg-white border-gray-300  dark:text-slate-700 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 '
                        id="fileUploadInput"
                        type="file"
                        accept="video/*"
                        onChange={(e) => {
                          const file = e.target.files[0];  
                          setNewQuit(prev => ({ 
                            ...prev, 
                            videoFile: file 
                          }));
                        }}
                      />
                      {
                        newQuit.videoFile &&
                        <video 
                          className=' sm:w-1/3'
                          src={URL.createObjectURL(newQuit.videoFile)}
                          controls
                        />
                      }
                    </div>
                  }
                  {
                    mode == 'record' 
                    &&
                    <div>
                      {
                        newQuit.videoFile
                        ?
                        <div
                          className='text-lg font-mono mt-2'
                        >
                            Recorded Video Ready 
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-green-500 inline size-8">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                            </svg>
                        </div> 
                        :
                        <VideoRecorder 
                          mode = {mode}
                          setNewQuit={setNewQuit}
                        />
                      }
                    </div>
                  }
                  <div
                    className='flex flex-col gap-3 mt-8'
                  >
                  <button
                    className="relative text-xl p-3 rounded-3xl bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 shadow-lg shadow-black flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          />
                        </svg>
                        Combobulating...
                      </>
                    ) : (
                      "Start Quit"
                    )}
                  </button> 
                  <button
                    className="text-xl p-3 rounded-3xl bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 shadow-lg shadow-black transform transition-transform duration-150 hover:shadow-md hover:shadow-black active:shadow-sm hover:translate-y-0.5 active:translate-y-2"
                    type='button' 
                    onClick={() => {
                      window.location = "/home"
                      window.location()
                    }}
                  >
                    Cancel 
                  </button>
                  </div>
                </div>
              )
            }
          </form>      
      </div>
    </div>
  )
}

export default AddQuit