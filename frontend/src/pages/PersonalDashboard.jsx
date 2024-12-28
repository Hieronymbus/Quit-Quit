import React, { useEffect, useState } from 'react'

const PersonalDashboard = () => {


  const [dailyQuote, setDailyQuote] = useState({})

  const fetchDailyQuote = async () => {
      try {
        const response = await fetch("/api/misc/quote")
        const data = await response.json()
        console.log(data)
      } catch (error) {
        
      }
  }
  useEffect(()=>{
    fetchDailyQuote()

  },[])

  return (
    <div>
      <header>
        <button></button>
        <div></div>
        <button></button>
      </header>
      <div>
        <div>

        </div>
        <div>

        </div>
        <div>

        </div>
      </div>
    </div>
  )
}

export default PersonalDashboard