import { useState, useEffect } from 'react';
import { Routes, Route} from 'react-router-dom';

import PreLoginRoutes from './utils/PreLoginRoutes.jsx';
import ProtectedRoutes from './utils/ProtectedRoutes';
import Landing from './pages/Landing';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import PersonalDashboard from './pages/PersonalDashboard';
import QuitStats from './pages/QuitStats';
import QuitAdvice from './pages/QuitAdvice';
import QuitMilestones from './pages/QuitMilestones';
import AddQuit from './pages/AddQuit';

function App() {
  
  const [selectedQuit, setSelectedQuit] = useState(() => {
    const savedQuitID = localStorage.getItem('selectedQuit');
    console.log("0", savedQuitID)
    return savedQuitID ? savedQuitID : 'tbd'; 
  })
  useEffect(() => {
    localStorage.setItem('selectedQuit', selectedQuit);
  }, [selectedQuit]);
  
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage for the theme
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    // Add or remove the `dark` class on the root element
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);


  return (
    <>
        <Routes>
          <Route element={<PreLoginRoutes />}>
            <Route element={<Landing setDarkMode={setDarkMode} darkMode={darkMode} setSelectedQuit={setSelectedQuit}/>} path='/' />
            <Route element={<Login setDarkMode={setDarkMode} darkMode={darkMode} setSelectedQuit={setSelectedQuit}/> } path="/login" />
            <Route element={<Register setDarkMode={setDarkMode} darkMode={darkMode} setSelectedQuit={setSelectedQuit}/> } path="/register" />
          </Route>
          <Route element={<ProtectedRoutes /> } >
            <Route element={<PersonalDashboard setDarkMode={setDarkMode} darkMode={darkMode} setSelectedQuit={setSelectedQuit} />} path="/home"/>
            <Route element={<About /> } path="/about" />
            <Route element={<QuitStats selectedQuit={selectedQuit} setSelectedQuit={setSelectedQuit} />} path="/quitStats"/>
            <Route element={<QuitMilestones selectedQuit={selectedQuit} setSelectedQuit={setSelectedQuit}/>} path="/quitMilestones"/>
            <Route element={<QuitAdvice  selectedQuit={selectedQuit} setSelectedQuit={setSelectedQuit}/>} path="/quitAdvice"/>
            <Route element={<AddQuit />} path="/addQuit" />
          </Route>
        </Routes>
      
    </>
  )
}

export default App
