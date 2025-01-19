import React, {useEffect, useState} from 'react';
import {  useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/user.js';
import { useAddictionStore } from '../store/addiction.js';
import { useQuitStore } from '../store/quit.js';
import VideoRecorder from '../components/VideoRecorder.jsx';
import Header from '../components/Header.jsx';

const AddQuit = () => {
  const navigate = useNavigate();
  const {user} = useUserStore();
  const {addictionsArr, fetchAddictions} = useAddictionStore();
  const {createQuit} = useQuitStore();
  const [mode, setMode] = useState("")
  const [newQuit, setNewQuit] = useState({
      userID: user.userDetails._id,
      addictionTypeID:"",
      startDate:"",
      endDate:"",
      usageParameters:{},
      reasonsToQuit:"",
      videoFile: null,
      status: "active"
  });
  const [addictionChoiceParameters, setAddictionChoiceParameters] = useState([]);

  useEffect(() => {
      fetchAddictions();
  }, [])
  console.log(addictionsArr)

  useEffect(() => {
    if(newQuit.addictionTypeID){
      const choice = addictionsArr.find(addiction => addiction._id === newQuit.addictionTypeID)
      setAddictionChoiceParameters(choice.usageParameters)
    }
  }, [newQuit.addictionTypeID])

  function setDates(e) {
    // Parse the start date from input (this will be in the format "YYYY-MM-DDTHH:mm")
    const newStartDate = new Date(e.target.value); 
    
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
  

  async function handleAddQuit(e) {
    e.preventDefault()
    console.log(newQuit.videoFile)
    const {success, message} = await createQuit(newQuit)
    console.log(message)
    setNewQuit(
      {
        userID: user._id,
        addictionType:"",
        startDate:"",
        endDate:"",
        usageParameters:{},
        reasonsToQuit:"",
        videoFile: "",
        status: "active"
    }
    )

    alert(message)
    if(success) {

      // navigate("/personalDashboard")
      window.location = "/home"
      window.location()
    }
  }

  return (
    <div
        className='h-screen w-screen'
    > 
      <Header />
      <div
        className='p-5 h-5/6 w-full flex flex-col justify-start items-center bg-slate-200 overflow-y-auto no-scrollbar dark:bg-slate-600 dark:text-slate-100'
      >
          <form 
            onSubmit={handleAddQuit} 
            className='w-1/2 p-4 flex flex-col gap-3'
          >
            <div>
              <label htmlFor="addictionSelect" className="block text-lg font-medium  mb-1">
                  Select Addiction you wish to quit:
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
                  {addictionsArr.map((addiction, index) => {
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
                      Choose a Start Date:
                  </label>
                  <input
                      className="block w-full p-2 pl-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 dark:text-slate-700"
                      type="datetime-local"
                      id='startDateInput'
                      onChange={(e) => setDates(e)}
                      value={newQuit.startDate ? newQuit.startDate.toISOString().slice(0, 16) : ""}
                  />
                </div>
              )
            }
            {
              addictionChoiceParameters.map((parameter, index) => {
                const nameSplit = parameter.name.split(' ');
                const name = nameSplit[0];
                return  <div>
                          <label
                            htmlFor={`parameter${index + 1}`}
                            className='block w-full text-lg font-medium  mb-1'
                            key={index}
                          >
                          {parameter.name}:
                        </label>
                        <input 
                          className='block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 dark:text-slate-700'
                          type={parameter.type}
                          id={`parameter${index + 1}`}
                          step="0.01"
                          onChange={(e) =>
                            setNewQuit(prev => ({...prev, usageParameters:{...prev.usageParameters, [name]: e.target.value }}))
                          }
                        />
                        </div> 
              })
            }

            {
              newQuit.addictionTypeID
              &&
              (
                <div
                  className=' flex flex-col gap-3'
                > 
                <div>
                  <label
                    className='block text-lg font-medium  mb-1'
                    htmlFor='textReasonsTextArea'
                  >
                    Reasons for quiting(optional) :
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
                    !newQuit.videoFile
                    &&
                    <div>
                      <label
                        className='block w-full text-lg font-medium  mb-1'
                        htmlFor='modeSelect'
                      >
                        Would you like to upload or record a video message to youself that you can rewatch in the future to remind youself 
                        why you are making this change in  your life to quit(optional)?
                      </label>
                      <select
                        className='block w-full p-2 pt-2.5 pb-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 dark:text-slate-700'
                        id='modeSelect'
                        onChange={(e) => {setMode(e.target.value)}}
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
                        className='block w-full text-lg font-medium text-gray-700 mb-1'
                        htmlFor="fileUploadInput"
                      >
                        Choose file from device to upload:   
                      </label>  
                      <input 
                        className='block w-full p-2 pt-2.5 pb-2.5 border bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500'
                        type="file"
                        id="fileUploadInput"
                        onChange={(e) => {
                          const file = e.target.files[0];  
                          setNewQuit(prev => ({ 
                            ...prev, 
                            videoFile: file 
                          }));
                        }}
                      />
                    </div>
                  }
                  {
                    mode == 'record' 
                    &&
                    <div>

                      {
                        newQuit.videoFile
                        ?
                        <div>
                            Recorded Video Uploaded 
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
                    className='flex gap-3 mt-4'
                  >
                  <button
                    type='submit'
                    className='border-2 p-2 rounded-md'
                  >
                    Start Quit
                  </button>  
                  <button
                    className='border-2 p-2 rounded-md'
                    type='button' 
                    onClick={() => navigate('/personalDashboard')}
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