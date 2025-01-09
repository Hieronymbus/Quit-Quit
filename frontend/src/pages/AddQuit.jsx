import React, {useEffect, useState} from 'react';
import { useUserStore } from '../store/user.js';
import { useAddictionStore } from '../store/addiction.js';
import VideoRecorder from '../components/VideoRecorder.jsx';
const AddQuit = () => {

  const {user} = useUserStore();
  const {addictionsArr, fetchAddictions} = useAddictionStore();
  const [mode, setMode] = useState("")
  const [newQuit, setNewQuit] = useState({
      userID: user._id,
      addictionType:"",
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
    if(newQuit.addictionType){
      const choice = addictionsArr.find(addiction => addiction.name === newQuit.addictionType)
      setAddictionChoiceParameters(choice.usageParameters)
    }
  }, [newQuit.addictionType])

  function setDates(e) {
    const newStartDate = new Date(e.target.value); 
    const newEndDate = new Date(newStartDate); 
    newEndDate.setMonth(newStartDate.getMonth() + 6);
  
    // Handle cases where the end date is invalid due to month overflow (e.g., Feb 31st)
    if (newEndDate.getDate() !== newStartDate.getDate()) {
      newEndDate.setDate(0); // Adjust to the last valid day of the month
    }
  
    setNewQuit((prev) => ({
      ...prev,
      startDate: newStartDate,
      endDate: newEndDate,
    }));
  }

  return (
    <div>
      Create a New Quit Below
      <br/>
      <br/>
        <form 
          // onSubmit={} 
        >
          <label htmlFor="addictionSelect">
            Select Addiction you wish to quit:
            <select 
              id="addictionSelect"
              onChange={(e)=>{setNewQuit(prev=>({...prev,addictionType: e.target.value}))}}
              value={newQuit.addictionType}
            >
              <option value="" disabled>
                -- Select an option --
              </option>
              {addictionsArr.map((addiction, index) => {
                return  <option value={addiction.name} key={index}>
                          {addiction.name}
                        </option>
              })}
            </select>
          </label>
          <br/> 
          <br/>
          {
            newQuit.addictionType 
            &&
            (
              <label
                htmlFor='startDateInput'
              >
                <input
                  type="date" 
                  id='startDateInput'
                  onChange={(e) => setDates(e)}
                  value={newQuit.startDate ? newQuit.startDate.toISOString().split("T")[0] : ""}
                />
              </label>
            )
          }
          <br/>
          <br/>
          
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
                          onChange={(e) =>
                            setNewQuit(prev => ({...prev, usageParameters:{...prev.usageParameters, name: e.target.value }}))
                          }
                        />
                      </label>
            })
          }
          
          <br/> 
          <br/>

          {
            newQuit.addictionType 
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
                      id='fileUploadInput'
                      onChange={(e) => {setNewQuit(prev => ({...prev, videoFile: e.target.value}))}}
                      value={newQuit.videoFile}
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
          <br/>
          <br />

          
          <button
            type='submit'
          >
              Start Quit
          </button>  
        </form>      
    </div>
  )
}

export default AddQuit