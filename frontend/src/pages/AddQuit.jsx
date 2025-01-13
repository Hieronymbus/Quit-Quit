import React, {useEffect, useState} from 'react';
import {  useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/user.js';
import { useAddictionStore } from '../store/addiction.js';
import { useQuitStore } from '../store/quit.js';
import VideoRecorder from '../components/VideoRecorder.jsx';
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
    navigate("/personalDashboard")
  }

  return (
    <div
      className='h-screen w-screen p-4 flex flex-col justify-start items-center gap-4'
    >
      <h1>
        Create a New Quit Below
      </h1>
      
      
        <form 
          onSubmit={handleAddQuit} 
          className='flex flex-col gap-3'
        >
          <label htmlFor="addictionSelect">
            Select Addiction you wish to quit:
            <select 
              id="addictionSelect"
              onChange={(e)=>{setNewQuit(prev=>({...prev,addictionTypeID: e.target.value}))}}
              value={newQuit.addictionTypeID}
            >
              <option value="" disabled>
                -- Select an option --
              </option>
              {addictionsArr.map((addiction, index) => {
                return  <option value={addiction._id} key={index}>
                          {addiction.name}
                        </option>
              })}
            </select>
          </label>
          
          {
            newQuit.addictionTypeID
            &&
            (
              <label
                htmlFor='startDateInput'
              >
                <input
                  type="datetime-local" 
                  id='startDateInput'
                  onChange={(e) => setDates(e)}
                  value={newQuit.startDate ? newQuit.startDate.toISOString().slice(0, 16) : ""} // Formatting to YYYY-MM-DDTHH:mm
                />
              </label>
            )
          }
          
          {

            addictionChoiceParameters.map((parameter, index) => {
              const nameSplit = parameter.name.split(' ');
              const name = nameSplit[0];
              return  <label
                        htmlFor={`parameter${index + 1}`}
                        key={index}
                      >
                        {parameter.name}:
                        <input 
                          type={parameter.type}
                          id={`parameter${index + 1}`}
                          step="0.01"
                          onChange={(e) =>
                            setNewQuit(prev => ({...prev, usageParameters:{...prev.usageParameters, [name]: e.target.value }}))
                          }
                        />
                      </label>
            })
          }

          {
            newQuit.addictionTypeID
            &&
            (
              <div>
                <label
                  htmlFor='textReasonsTextArea'
                >
                  reasons for quiting(optional) :
                  <textarea
                    id='textReasonsTextArea'
                    onChange={(e) => {setNewQuit(prev => ({...prev, reasonsToQuit: e.target.value }))}}
                    value={newQuit.reasonsToQuit}
                  >
                  </textarea>
                </label>
                <br />
                <br />
                <label
                  htmlFor='modeSelect'
                >
                  Would you like to upload or record a video message to youself that you can rewatch in the future to remind youself 
                  why you are making this change in  your life to quit(optional)?
                  <select
                    id='modeSelect'
                    onChange={(e) => {setMode(e.target.value)}}
                    value={mode}
                  >
                    <option value='skip'>Skip</option>
                    <option value="upload">Upload</option>
                    <option value='record'>Record</option>
                  </select>
                </label>
                {
                  mode == 'skip'
                  &&
                  <div></div> 
                }
                {
                  mode == 'upload' 
                  &&
                  <label 
                    htmlFor="fileUploadInput"
                  >
                    choose file from device to upload -   
                    <input 
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
                  </label>  
                }
                {
                  mode == 'record' 
                  &&
                  <VideoRecorder 
                    setNewQuit={setNewQuit}
                  />
                }
              </div>
            )
          }
          
          
          <div
            className='flex gap-3'
          >
          <button
            type='submit'
            className='border-4 border-black'
          >
            Start Quit
          </button>  
          <button
            className='border-4 border-black'
            type='button' 
            onClick={() => navigate('/personalDashboard')}
          >
            Cancel and return to dashbaord
          </button>
          </div>
        </form>      
    </div>
  )
}

export default AddQuit