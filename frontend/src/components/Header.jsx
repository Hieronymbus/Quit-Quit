import React,{useState,useEffect} from 'react'

const Header = () => {

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

    },[])


    return (
        <header
            className='h-1/6 flex justify-around items-center border-b-4 '
        >
            <button
                className='w-1/6 p-2 border border-slate-500' 
            >
                Menu
            </button>
            <div
             
            >
              {dailyQuote}
            </div>
            <button
                className='w-1/6 p-2 border border-slate-500'
            >
                Add Quit
                
            </button>
        </header>
    )
}

export default Header