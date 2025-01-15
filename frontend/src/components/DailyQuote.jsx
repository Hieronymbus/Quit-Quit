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
    <div
        className='w-2/3 flex flex-col items-center'
    >
        <h1
            className='text-center text-2xl'
        >
            Quote of the Day
        </h1>
        {dailyQuote}
    </div>
  )
}

export default DailyQuote