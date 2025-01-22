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
   
    <div className="flex flex-col items-center gap-1 pb-3 border-b border-b-slate-500 dark:border-slate-400 ">
        <h1 className="text-3xl text-center font-bold text-blue-600 dark:text-blue-400">
            Quote of the Day
        </h1>
        {
            dailyQuote
            ?
            <div className="flex flex-col items-center max-w-2xl px-4 text-center">
                <h2 className="text-xl font-medium ">
                    {dailyQuote[0]?.q}
                </h2>
                <h3 className="text-lg font-semibold mt-2 text-gray-700 dark:text-gray-400">
                    — {dailyQuote[0]?.a}
                </h3>
            </div>
            :
            <div>cacheing..</div>
        }
    </div>
    
    
   

  )
}

export default DailyQuote