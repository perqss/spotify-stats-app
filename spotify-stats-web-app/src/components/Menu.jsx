import React, { useState, useEffect, useRef } from 'react';
import { Box, List, ListItem, ListItemButton, ListItemText, ListItemIcon, Collapse } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import { mainColor } from '../common';
import { FaSpotify } from 'react-icons/fa'
import { spotifyGreen } from '../common';
import { MenuItemButton, SubMenuItemButton } from './MaterialComponentsCss';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import HistoryIcon from '@mui/icons-material/History';
import TopBar from './TopBar';
import zIndex from '@mui/material/styles/zIndex';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const Menu = (props) => {
  const [selectedMenu, setSelectedMenu] = useState(props.componentIndex);
  const [selectedSubMenu, setSelectedSubMenu] = useState('All Time');
  const menuItems = ['Top Artists', 'Top Songs', 'Recently Played'];
  const subMenuItems = ['All Time', 'Last 6 Months', 'Last 4 Weeks'];
  const menuIcons = [<MicIcon/>, <MusicNoteIcon/>, <HistoryIcon/>];
  const [topArtistsSubMenu, setTopArtistsSubMenu] = useState(true);
  const [topSongsSubMenu, setTopSongsSubMenu] = useState();
  const [showCollapse, setShowCollapse] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const count = location?.state?.count;

  const handleClickMenuItem = (index) => {
    setSelectedMenu(index);
  };

  useEffect(() => {
    if (selectedMenu === 0) {
        navigate('/top-artists');
    } else if (selectedMenu === 1) {
        navigate('/top-songs', {state: {count: 0}});
    } else if (selectedMenu === 2) {
        navigate('/recently-played');
    }
  }, [selectedMenu, selectedSubMenu])

  useEffect(() => {
    console.log(props.term)
    if (props.term === 'long_term') {
        setSelectedSubMenu(subMenuItems[0]);
    } else if (props.term === 'medium_term') {
        setSelectedSubMenu(subMenuItems[1]);
    } else if (props.term === 'short_term') {
        setSelectedSubMenu(subMenuItems[2]);
    }
  }, [count])

  const setPropsTerm = (subMenuItem, setTerm) => {
    if (subMenuItem === subMenuItems[0]) {
        setTerm('long_term');
    } else if (subMenuItem === subMenuItems[1]) {
        setTerm('medium_term');
    } else {
        setTerm('short_term');
    }
  };

  const handleClickSubMenuItem = (subMenuItem, index) => {
    if (index === 0) {
        setPropsTerm(subMenuItem, props.setArtistTerm);
    } else if (index === 1) {
        setPropsTerm(subMenuItem, props.setSongTerm);
    }
    setSelectedSubMenu(subMenuItem);
  };

  return (
    <div>
        <TopBar/>
        <Box 
            sx={{
                maxWidth: '200px', 
                height: '100vh', 
                display: 'flex', 
                flexDirection: 'column', 
                marginTop: '60px', 
                position: 'fixed'
            }}
        >
            <div>
            <List 
                sx={{backgroundColor: mainColor}}
            >
                {menuItems.map((item, index) => 
                    <div
                        key={index}
                    >
                        <ListItem
                            disablePadding
                        >
                            <MenuItemButton
                                onClick={() => handleClickMenuItem(index)}
                                selected={selectedMenu === index}
                            >
                                <ListItemIcon
                                    sx={{color: 'white'}}
                                >
                                    {menuIcons[index]}
                                </ListItemIcon>
                                <ListItemText
                                    sx={{color: 'white'}}
                                >
                                    {item}
                                </ListItemText>
                            </MenuItemButton>
                        </ListItem>
                        {index === 0 || index === 1 ?
                            <Collapse
                                in={selectedMenu === index}
                            >
                                {subMenuItems.map(subMenuItem => 
                                    <ListItem 
                                        disablePadding 
                                        key={subMenuItem}
                                    >
                                        <SubMenuItemButton
                                            onClick={() => handleClickSubMenuItem(subMenuItem, index)}
                                            selected={selectedSubMenu === subMenuItem}
                                        >
                                            <ListItemText
                                                sx={{
                                                    color: 'white',
                                                    fontSize: 'medium',
                                                }}
                                                disableTypography
                                            >
                                                {subMenuItem}
                                            </ListItemText>
                                        </SubMenuItemButton>
                                    </ListItem>
                                )}

                            </Collapse> 
                            : ''
                        }
                    </div>    
                    )
                }
                
            </List>
            <div 
                style={{
                    height: '100vh', 
                    backgroundColor: mainColor
                }}
            />
            </div>
        </Box>
    </div>
  )
}

export default Menu