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
import SongInfo from './pages/SongInfo';
import MusicTaste from './pages/MusicTaste';
import TopAlbums from './pages/TopAlbums';

export const AppContext = createContext();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [songId, setSongId] = useState();
  const [artistId, setArtistId] = useState();
  const [albumId, setAlbumId] = useState();
  const [openBottomBar, setOpenBottomBar] = useState(false);
  const [artistTerm, setArtistTerm] = useState('long_term');
  const [songTerm, setSongTerm] = useState('long_term');
  const [albumTerm, setAlbumTerm] = useState('long_term');

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
          setAlbumId,
          setOpenBottomBar,
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
                term={artistTerm}
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
                term={songTerm}
              />
              <TopSongs
                songTerm={songTerm}
              />
            </div>
          }/>
        <Route
          path='/top-albums'
          element={
            <div>
              <Menu
                componentIndex={2}
                setAlbumTerm={setAlbumTerm}
                term={albumTerm}
              />
              <TopAlbums
                albumTerm={albumTerm}
              />
            </div>
          }
        />
        <Route 
          path='/recently-played' 
          element={
            <div>
              <Menu
                componentIndex={3}
              />
              <RecentlyPlayed/>
            </div>
          }/>
        <Route
          path='/artist/:artistId'
          element={
            <div>
              <Menu
                setArtistTerm={setArtistTerm}
              />
              <ArtistProfile/>
            </div>
          }
        />
        <Route
          path='/song/:songId'
          element={
            <div>
              <Menu
                setSongTerm={setSongTerm}
              />
              <SongInfo/>
            </div>
          }
        />
        <Route
          path='/music-taste'
          element={
            <div>
              <Menu
                componentIndex={4}
              />
              <MusicTaste/>
            </div>
          }
        />
      </Routes>
      <BottomBar
          songId={songId}
          artistId={artistId}
          albumId={albumId}
          open={openBottomBar}
          setOpen={setOpenBottomBar}
        />
      </AppContext.Provider>
    </Router>
  );
}

export default App;
