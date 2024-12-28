import React,{useState,useEffect} from 'react'

const Header = () => {

const [dailyQuote, setDailyQuote] = useState("")

  const fetchDailyQuote = async () => {
      try {
        const response = await fetch("/api/misc/quote")
        const data = await response.json()
        setDailyQuote(data.data)
      } catch (error) {
        
      }
  }
  useEffect(()=>{
    fetchDailyQuote()

  },[])


  return (
    <header>
        <button></button>
        <div>{dailyQuote}</div>
        <button></button>
    </header>
  )
}

export default Header