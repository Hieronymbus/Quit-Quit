import React,{useEffect,useState} from 'react'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import { useQuitStore } from '../store/quit.js'
import { useUserStore } from '../store/user.js'

const QuitMilestones = ({selectedQuit, setSelectedQuit}) => {

  const {fetchQuits, quits} = useQuitStore();
  const {user } = useUserStore()
  useEffect(() => {
    fetchQuits("677337ddbc40fcf08b9b94b9");
  },[fetchQuits])
  useEffect(()=>{
    if(user.isLoggedIn === false) {
      localStorage.removeItem('selectedQuit')
    }
}, [user.isLoggedIn])
  const currentQuit = quits.find((quit) => quit._id === selectedQuit)
  console.log(currentQuit)

  return (
    <div
      className="h-screen"
    >
      <Header currentQuit={currentQuit} setSelectedQuit={setSelectedQuit}/>
      <div class="h-4/6 grid grid-rows-2 grid-cols-5 gap-2">
        <div class="bg-blue-500">1</div>
        <div class="bg-blue-500">2</div>
        <div class="bg-blue-500">3</div>
        <div class="bg-blue-500">4</div>
        <div class="bg-blue-500">5</div>
        <div class="bg-blue-500">6</div>
        <div class="bg-blue-500">7</div>
        <div class="bg-blue-500">8</div>
        <div class="bg-blue-500">9</div>
        <div class="bg-blue-500">10</div>
      </div>
      <Footer/>

    </div>
  )
}

export default QuitMilestones