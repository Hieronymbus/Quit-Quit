import { useState, useEffect } from 'react';
import { Routes, Route} from 'react-router-dom';

import ProtectedRoutes from './utils/ProtectedRoutes';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import PersonalDashboard from './pages/PersonalDashboard';
import QuitStats from './pages/QuitStats';
import QuitAdvice from './pages/QuitAdvice';
import QuitMilestones from './pages/QuitMilestones';
import AddQuit from './pages/AddQuit';
import { useUserStore } from './store/user.js';

function App() {
  const { user, fetchUser } = useUserStore()
  
  const [selectedQuit, setSelectedQuit] = useState(() => {
    const savedQuitID = localStorage.getItem('selectedQuit');
    console.log("0", savedQuitID)
    return savedQuitID ? savedQuitID : ''; 
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
          <Route element={<Home />} path='/' />
          <Route element={<Login /> } path="/login" />
          <Route element={<Register /> } path="/register" />
          <Route element={<About /> } path="/about" />

          <Route element={<ProtectedRoutes /> } >
            <Route element={<PersonalDashboard setDarkMode={setDarkMode} darkMode={darkMode} setSelectedQuit={setSelectedQuit} />} path="/personalDashboard"/>
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
