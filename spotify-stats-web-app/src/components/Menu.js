import React, { useState } from 'react';
import { Box, List, ListItem, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import { mainColor } from '../common';
import { FaSpotify } from 'react-icons/fa'
import { spotifyGreen } from '../common';
import { MenuItemButton } from './MaterialComponentsCss';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import HistoryIcon from '@mui/icons-material/History';
import TopBar from './TopBar';


const Menu = () => {
  const [selected, setSelected] = useState(0);

  const handleClick = (index) => {
    setSelected(index);
  };

  return (
    <div>
            <TopBar/>
            <Box sx={{ width: 200, height: '100vh', display: 'flex', flexDirection: 'column', position: 'fixed', marginTop: '60px'}}>
                <List sx={{backgroundColor: mainColor}}>
                    <ListItem 
                        key={0}
                        disablePadding
                    >
                        <MenuItemButton
                            onClick={() => handleClick(0)}
                            selected={selected === 0}
                        >
                            <ListItemIcon sx={{color: 'white'}}>
                                <MicIcon/>
                            </ListItemIcon>
                            <ListItemText sx={{color: 'white'}}>
                                Top Artists
                            </ListItemText>
                        </MenuItemButton>
                    </ListItem>
                    <ListItem 
                        key={1}
                        disablePadding
                    >
                            <MenuItemButton
                                onClick={() => handleClick(1)}
                                selected={selected === 1}
                            >
                            <ListItemIcon sx={{color: 'white'}}>
                                <MusicNoteIcon/>
                            </ListItemIcon>
                            <ListItemText sx={{color: 'white'}}>
                                Top Songs
                            </ListItemText>
                        </MenuItemButton>
                    </ListItem>
                    <ListItem 
                        key={2}
                        disablePadding
                        >
                            <MenuItemButton
                            onClick={() => handleClick(2)}
                            selected={selected === 2}
                        >
                            <ListItemIcon sx={{color: 'white'}}>
                                <HistoryIcon/>
                            </ListItemIcon>
                            <ListItemText sx={{color: 'white'}}>
                                Recently Played
                            </ListItemText>
                        </MenuItemButton>
                    </ListItem>
                </List>
                <div style={{backgroundColor: mainColor, height: '100%'}}/>
            </Box>
        </div>
  )
}

export default Menu