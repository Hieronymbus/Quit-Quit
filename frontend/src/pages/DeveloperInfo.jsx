import React from 'react'
import Header from '../components/Header'

import avatar from '../assets/avatarrr.png'
import lightAvatar from '../assets/lightAvatarrr.png'

const DeveloperInfo = ({darkMode, setDarkMode}) => {

  return (
    <div
      className='min-h-screen  flex flex-col bg-slate-200 dark:bg-slate-600 dark:text-slate-200 '
    >
        <Header setDarkMode={setDarkMode} darkMode={darkMode}/>
        <div
          className='p-4 '
        > 
          <div
            className='flex justify-center sm:justify-start items-center flex-wrap'
          >
            <img src={avatar} className='h-80 hidden dark:block'/>
            <img src={lightAvatar} className='h-80 dark:hidden' />
            <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Get in Touch</h3>
              <p className="text-gray-600">
                Found a bug or issue? Have enquiries or want to collaborate? Let’s connect!
              </p>
              <ul className="mt-2">
                <li>
                  📧 <a href="mailto:BirdsallAlexander1990@gmail.com" className="text-blue-500 hover:underline">BirdsallAlexander1990@gmail.com</a>
                </li>
                <li>
                  🔗 <a href="https://www.linkedin.com/in/alexander-birdsall-6b506131b/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">LinkedIn Profile</a>
                </li>
              </ul>
            </div>
            <p
              className='mt-2'
            >
            This project started as a simple idea but quickly became a challenge that pushed my skills to the next level. I wanted to build something practical, visually appealing, and user-friendly—while also sharpening my abilities in React, Tailwind CSS, and backend integration. What I love most about it is seeing everything come together, from concept to execution. The biggest struggle? Debugging unexpected issues and making sure every detail worked seamlessly. But through persistence and problem-solving, I turned obstacles into learning experiences. This project isn't just a product—it's proof of growth, creativity, and dedication.
            </p>
            <div
              className='mt-8 flex flex-col w-full items-start'
            >
              <h2 className="text-3xl font-bold  mb-4 text-blue-600 dark:text-blue-400">
                Tech Stack
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-lg ">
                <li className="flex items-center">
                  <span className="w-2.5 h-2.5 bg-teal-500 rounded-full mr-2"></span> React
                </li>
                <li className="flex items-center">
                  <span className="w-2.5 h-2.5 bg-teal-500 rounded-full mr-2"></span> Node.js
                </li>
                <li className="flex items-center">
                  <span className="w-2.5 h-2.5 bg-teal-500 rounded-full mr-2"></span> MongoDB
                </li>
                <li className="flex items-center">
                  <span className="w-2.5 h-2.5 bg-teal-500 rounded-full mr-2"></span> Express.js
                </li>
                <li className="flex items-center">
                  <span className="w-2.5 h-2.5 bg-teal-500 rounded-full mr-2"></span> Tailwind CSS
                </li>
              </ul>
            </div>
           
          </div>
          <div className="mt-8 flex flex-col items-center ">
            <h3 className="text-xl font-semibold mb-4">Icon Credits</h3>
            <p className="text-sm ">
              Icons by <a href="https://lordicon.com/" className="text-blue-500 hover:text-blue-700">Lordicon.com</a>
            </p>
            <p className="text-sm ">
               
            Trophy animated icons created by <a href="https://www.flaticon.com/free-animated-icons/trophy" title="trophy animated icons" className="text-blue-500 hover:text-blue-700">
              Freepik - Flaticon
            </a>
            </p>
            <p className="text-sm ">
              Icons by <a href="https://heroicons.com/" className="text-blue-500 hover:text-blue-700">Heroicons</a>
            </p>
          </div>
        </div>
    </div>
  )
}

export default DeveloperInfo