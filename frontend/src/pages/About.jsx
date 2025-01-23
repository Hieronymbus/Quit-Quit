import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../store/user'

import Header from '../components/Header'

const About = ({darkMode, setDarkMode}) => {
  
  const navigate = useNavigate()
  const {fetchUser, user} = useUserStore()
    useEffect(() => {
      fetchUser() 
       
    }, [fetchUser])

  const handleReturnclick = () => {
    if(user.isLoggedIn) {
      navigate("/personalDashboard")
    } else {
      navigate("/")
    }
  }

  return (
    <div
      className='min-h-screen w-screen flex flex-col bg-slate-200 dark:bg-slate-600 dark:text-slate-50 '
    >
      <Header setDarkMode={setDarkMode} darkMode={darkMode} />
      <div
        className='w-11/12 p-5 text-justify flex flex-col gap-5 '
      > 
        <div>

          <h1
            className='text-4xl mb-2 text-center sm:text-left'
          >
            Introduction
          </h1>
          <h2
            className='text-lg text-wrap'
          >
            Congratulations on taking this incredible step toward a healthier, 
            addiction-free life! Deciding to confront and overcome addiction is no small feat, and it shows your strength, courage, and commitment to change. 
            By coming to this website, you've demonstrated a willingness to invest in yourself and your future—a choice that takes immense bravery. 
            Remember, every great journey begins with a single step, and you're already on the path to success. 
            Celebrate this moment, trust in your resilience, and know that you are never alone on this journey.
            We're here to support and guide you every step of the way. You've got this!
          </h2>
        </div>
        <div>

          <h1
            className='text-4xl mb-2 text-center sm:text-left'
          >
            About Addiction
          </h1>
          <h2
            className='text-lg text-wrap'
          >
            Addiction is a widespread challenge affecting millions of individuals worldwide, transcending age, gender, and cultural boundaries. 
            Globally, over 35 million people are estimated to suffer from substance use disorders, with only 1 in 7 receiving the necessary treatment. 
            Alcohol consumption accounts for 5.3% of all global deaths annually, and tobacco use causes over 8 million deaths each year. 
            Beyond substances, behavioral addictions such as gambling, gaming, and internet use are on the rise, highlighting the diverse forms addiction can take.
            The effects of addiction extend beyond the individual, often impacting families, communities, and economies through increased healthcare costs and lost productivity
          </h2>
        </div>
        <div>
          <h1
            className='text-4xl mb-2 text-center sm:text-left'
          >
            About the website
          </h1>
          <p
            className='text-lg text-wrap'
          >
          This website is your dedicated companion on the journey to breaking free from addiction, offering tools and structure to keep you motivated and focused.
          It is designed around a proven two-phase approach: a six-month **Action Phase**, where the primary goal is to establish and solidify your quit, followed by the **Maintenance Phase**, which is ongoing and lasts a lifetime. While the Maintenance Phase will be much easier than the Action Phase, the tools provided by this website will ensure you stay on track and committed.  

          The site features stat tracking to help you monitor key metrics, such as how long you've been free from your habit, the money you've saved, and the time you've regained—powerful motivators to remind you of your progress. Celebrate your journey with milestone achievements that mark significant moments, inspiring you to push forward and succeed.  

          Quitting advice and information are provided to address the specific challenges of your habit, helping you overcome obstacles and stay informed. Additionally, the website empowers you to reflect on your motivations by allowing you to document your reasons for quitting or record a heartfelt video message to your future self. These personal reminders will be invaluable during moments of weakness, helping to reinforce your resolve and keep you grounded in your purpose.  

          With this structured approach and a suite of powerful tools, the website is here to guide you through the intense but rewarding Action Phase and into a sustainable, addiction-free life in the Maintenance Phase.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About