import React, { useState, useEffect, useContext, createContext } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Login from './pages/Login';
import TopArtists from './pages/TopArtists';
import TopSongs from './pages/TopSongs';
import RecentlyPlayed from './pages/RecentlyPlayed';
import { checkAuth } from './common';
import TopBar from './components/TopBar';
import BottomBar from './components/BottomBar';

export const AppContext = createContext();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [songId, setSongId] = useState();
  const [artistId, setArtistId] = useState();

  useEffect(() => {
    const fetchLogged = async () => {
      try {
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
      <AppContext.Provider 
        value={{
          setSongId,
          setArtistId
        }}
      >
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/top-artists' element={<TopArtists/>}/>
        <Route path='/top-songs' element={<TopSongs/>}/>
        <Route path='/recently-played' element={<RecentlyPlayed/>}/>
      </Routes>
      {songId && 
        <BottomBar
          songId={songId}
        />
      }
      {artistId &&
        <BottomBar
          artistId={artistId}
        />
      }
      </AppContext.Provider>
    </Router>
  );
}

export default App;
