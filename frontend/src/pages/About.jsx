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
      className='min-h-screen  flex flex-col bg-slate-200 dark:bg-slate-600 dark:text-slate-50 '
    >
      <Header setDarkMode={setDarkMode} darkMode={darkMode} />
      <div className="w-full p-5 text-justify flex flex-col gap-8">
        {/* Introduction Section */}
        <section>
          <h1 className="text-4xl mb-4 text-center sm:text-left">Introduction</h1>
          <p className="text-lg">
            Congratulations on taking this incredible step toward a healthier, addiction-free life! Deciding to confront and overcome addiction is no small feat, and it shows your strength, courage, and commitment to change. 
            By coming to this website, you've demonstrated a willingness to invest in yourself and your future—a choice that takes immense bravery.
          </p>
          <p className="text-lg">
            Remember, every great journey begins with a single step, and you're already on the path to success. Celebrate this moment, trust in your resilience, and know that you are never alone on this journey. 
            We're here to support and guide you every step of the way. You've got this!
          </p>
        </section>

        {/* About Addiction Section */}
        <section>
          <h1 className="text-4xl mb-4 text-center sm:text-left">About Addiction</h1>
          <p className="text-lg">
            Addiction is a widespread challenge affecting millions of individuals worldwide, transcending age, gender, and cultural boundaries. Globally, over 35 million people are estimated to suffer from substance use disorders, with only 1 in 7 receiving the necessary treatment. 
          </p>
          <p className="text-lg">
            Alcohol consumption accounts for 5.3% of all global deaths annually, and tobacco use causes over 8 million deaths each year. Beyond substances, behavioral addictions such as gambling, gaming, and internet use are on the rise, highlighting the diverse forms addiction can take.
          </p>
          <p className="text-lg">
            The effects of addiction extend beyond the individual, often impacting families, communities, and economies through increased healthcare costs and lost productivity.
          </p>
        </section>

        {/* About the Website Section */}
        <section>
          <h1 className="text-4xl mb-4 text-center sm:text-left">About the Website</h1>
          <p className="text-lg">
            This website is your dedicated companion on the journey to breaking free from addiction, offering tools and structure to keep you motivated and focused. 
            It is designed around a proven two-phase approach: 
          </p>
          <ul className="list-disc list-inside text-lg">
            <li><strong>Action Phase:</strong> A six-month phase focused on establishing and solidifying your quit.</li>
            <li><strong>Maintenance Phase:</strong> A lifelong phase to ensure you stay on track with minimal effort.</li>
          </ul>
          <p className="text-lg">
            The site features stat tracking to monitor key metrics, such as how long you've been free from your habit, the money you've saved, and the time you've regained. These powerful motivators will remind you of your progress and inspire you to keep pushing forward. 
          </p>
          <p className="text-lg">
            Celebrate milestones, access quitting advice tailored to your specific challenges, and reflect on your motivations by documenting your reasons for quitting or recording a heartfelt video message to your future self. These tools will help reinforce your resolve during challenging moments.
          </p>
          <p className="text-lg">
            With this structured approach, the website is here to guide you through the intense but rewarding Action Phase and into a sustainable, addiction-free life in the Maintenance Phase.
          </p>
        </section>
      </div>
    </div>
  )
}

export default About