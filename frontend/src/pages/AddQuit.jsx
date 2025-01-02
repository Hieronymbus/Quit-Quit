import React, {useEffect} from 'react';
import { useUserStore } from '../store/user.js';
import { useAddictionStore } from '../store/addiction.js';
const AddQuit = () => {

  const {user} = useUserStore()
  const {addictionsArr, fetchAddictions} = useAddictionStore()

  useEffect(() => {
      fetchAddictions();
  }, [fetchAddictions])
  console.log(addictionsArr)

  return (
    <div>
      Create a New Quit Below
      <br/>
      <br/>
        <form 

        >
          <label htmlFor="addictionSelect">
            Select Addiction you wish to quit:
            <select name="addiction" id="addictionSelect">
              {addictionsArr.map((addiction, index) => {
                return  <option value={addiction.name} key={index}>
                          {addiction.name}
                        </option>
              })}
            </select>
          </label>
          <br/> 
          <br/>
          <button>
              Start Quit
          </button>  
        </form>      
    </div>
  )
}

export default AddQuit