import {styled} from '@mui/material/styles';
import { ListItemButton } from '@mui/material';

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


export { MenuItemButton, SubMenuItemButton };