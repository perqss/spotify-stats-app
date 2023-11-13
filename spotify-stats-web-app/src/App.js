import React, { useState, useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Login from './pages/Login';
import TopArtists from './pages/TopArtists';
import { checkAuth } from './common';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const fetchLogged = async () => {
      try {
        console.log('///')
				//await checkAuth();
        //setIsAuthenticated(true);
			} catch (e) {
        //setIsAuthenticated(false);
        throw e;
			}
    }
    fetchLogged();
  }, []);

  // if (!isAuthenticated) {
  //   return (
  //     <></>
  //   )
  // }

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/top-artists' element={<TopArtists/>}/>
      </Routes>
    </Router>
  );
}

export default App;
