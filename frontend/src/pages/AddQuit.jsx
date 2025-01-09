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
      usageParameters:"",
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
  return (
    <div>
      Create a New Quit Below
      <br/>
      <br/>
        <form 
          onSubmit={}
        >
          <label htmlFor="addictionSelect">
            Select Addiction you wish to quit:
            <select 
              name="addiction"
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
                />
              </label>
            )
          }
          <br/>
          <br/>
          
          {

            addictionChoiceParameters.map((parameter, index) => {
              return  <label
                        htmlFor={`paramerter${index + 1}`}
                        key={index}
                      >
                        {parameter.name}:
                        <input 
                          type={parameter.type}
                          id={`paramerter${index + 1}`}
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
                <label>
                  reasons for quiting(optional) :
                  <textarea>

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
                    name='modeSelect'
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
                    htmlFor=""
                  >
                    choose file from device to upload -   
                    <input 
                      type="file"
                    
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