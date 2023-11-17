import {styled} from '@mui/material/styles';
import { ListItemButton, IconButton } from '@mui/material';
import { darkerMainColor } from '../common';

const colorOnSelectMenuItem = '#444744';
const colorOnSelectSubMenuItem = '#333633';

const MenuItemButton = styled(ListItemButton)(({ theme }) => ({
    '&.Mui-selected': {
        backgroundColor: colorOnSelectMenuItem,
    },
    '&.Mui-selected:hover': {
        backgroundColor: colorOnSelectMenuItem,
    },
    ':hover': {
        backgroundColor: colorOnSelectMenuItem,
    }
}));

const SubMenuItemButton = styled(ListItemButton)(({ theme }) => ({
    '&.Mui-selected': {
        backgroundColor: colorOnSelectSubMenuItem,
    },
    '&.Mui-selected:hover': {
        backgroundColor: colorOnSelectSubMenuItem,
    },
    ':hover': {
        backgroundColor: colorOnSelectSubMenuItem,
    }
}));

const SongPlayButton = styled(IconButton)(({ theme }) => ({
    marginTop: 3,
    '&.Mui-selected': {
        backgroundColor: darkerMainColor,
    },
    '&.Mui-selected:hover': {
        backgroundColor: darkerMainColor,
    },
    ':hover': {
        backgroundColor: darkerMainColor,
    }
}));

const ArtistPlayButton = styled(IconButton)(({ theme }) => ({
    '&.Mui-selected': {
        backgroundColor: darkerMainColor,
    },
    '&.Mui-selected:hover': {
        backgroundColor: darkerMainColor,
    },
    ':hover': {
        backgroundColor: darkerMainColor,
    }
}));


export { MenuItemButton, SubMenuItemButton, SongPlayButton, ArtistPlayButton };