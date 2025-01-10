import React, {useState,useEffect} from 'react'

const DailyQuote = () => {

    const [dailyQuote, setDailyQuote] = useState("")

    const fetchDailyQuote = async () => {
        try {
            const response = await fetch("/api/misc/quote")
            const data = await response.json()
            setDailyQuote(data.data)
        } catch (err) {
            console.error("Error:",err)
            setDailyQuote("Have you heard the joke about yoga. Nevermind its a bit of a stretch.")
        }
    }
    useEffect(()=>{
        fetchDailyQuote()

    },[fetchDailyQuote])

  return (
    <div>{dailyQuote}</div>
  )
}

export default DailyQuote