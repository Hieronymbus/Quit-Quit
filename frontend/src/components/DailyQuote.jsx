import React, {useState,useEffect} from 'react'

const DailyQuote = () => {

    const [dailyQuote, setDailyQuote] = useState("")

    const fetchDailyQuote = async () => {
        try {
            const response = await fetch("/api/misc/quote")
            const data = await response.json()
            setDailyQuote(data.data)
        } catch (err) {
            console.error("Error:", err)
            setDailyQuote("Have you heard the joke about yoga. Nevermind its a bit of a stretch.")
        }
    }
    useEffect(()=>{
        fetchDailyQuote()    
    },[fetchDailyQuote])
  return (
    <div
        className=' flex flex-col gap-2'
    >
        <h1
            className=' text-6xl '
        >
            Quote of the Day
        </h1>
        <div
            className=''
        >
            <h2
                className='text-4xl'
            >
                {dailyQuote[0]?.q}
            </h2>
            <h3
                className='text-2xl text-gray-600'
            >
                {dailyQuote[0]?.a}
            </h3>
        </div>
    </div>
  )
}

export default DailyQuote