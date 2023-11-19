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
import Menu from './components/Menu';
import ArtistProfile from './pages/ArtistProfile';

export const AppContext = createContext();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [songId, setSongId] = useState();
  const [artistId, setArtistId] = useState();
  const [openBottomBar, setOpenBottomBar] = useState(false);
  const [artistTerm, setArtistTerm] = useState('long_term');
  const [songTerm, setSongTerm] = useState('long_term');

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
          setArtistId,
          setOpenBottomBar
        }}
      >
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route 
          path='/top-artists' 
          element={
            <div>
              <Menu
                componentIndex={0}
                setArtistTerm={setArtistTerm}
              />
              <TopArtists
                artistTerm={artistTerm}
              />
            </div>
          }
        />
        <Route 
          path='/top-songs' 
          element={
            <div>
              <Menu
                componentIndex={1}
                setSongTerm={setSongTerm}
              />
              <TopSongs
                songTerm={songTerm}
              />
            </div>
          }/>
        <Route 
          path='/recently-played' 
          element={
            <div>
              <Menu/>
              <RecentlyPlayed/>
            </div>
          }/>
        <Route
          path='/artist/:artistId'
          element={
            <div>
              <Menu
                componentIndex={3}
                setArtistTerm={setArtistTerm}
              />
              <ArtistProfile/>
            </div>
          }
        />
      </Routes>
      <BottomBar
          songId={songId}
          artistId={artistId}
          open={openBottomBar}
          setOpen={setOpenBottomBar}
        />
      </AppContext.Provider>
    </Router>
  );
}

export default App;
