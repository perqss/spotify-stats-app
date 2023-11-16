import React, { useState } from 'react';
import { Box, List, ListItem, ListItemButton, ListItemText, ListItemIcon, Collapse } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import { mainColor } from '../common';
import { FaSpotify } from 'react-icons/fa'
import { spotifyGreen } from '../common';
import { MenuItemButton, SubMenuItemButton } from './MaterialComponentsCss';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import HistoryIcon from '@mui/icons-material/History';
import TopBar from './TopBar';


const Menu = (props) => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [selectedSubMenu, setSelectedSubMenu] = useState('All Time');
  const menuItems = ['Top Artists', 'Top Songs', 'Recently Played'];
  const subMenuItems = ['All Time', 'Last 6 Months', 'Last 4 Weeks'];
  const menuIcons = [<MicIcon/>, <MusicNoteIcon/>, <HistoryIcon/>];
  const [topArtistsSubMenu, setTopArtistsSubMenu] = useState(true);
  const [topSongsSubMenu, setTopSongsSubMenu] = useState();

  const handleClickMenuItem = (index) => {
    setSelectedMenu(index);
  };

  const handleClickSubMenuItem = (subMenuItem) => {
    if (subMenuItem === subMenuItems[0]) {
        props.setTerm('long_term');
    } else if (subMenuItem === subMenuItems[1]) {
        props.setTerm('medium_term');
    } else {
        props.setTerm('short_term');
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
                                            onClick={() => handleClickSubMenuItem(subMenuItem)}
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