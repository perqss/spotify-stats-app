import {styled} from '@mui/material/styles';
import { ListItemButton } from '@mui/material';

const colorOnSelect = '#444744'

const MenuItemButton = styled(ListItemButton)(({ theme }) => ({
    '&.Mui-selected': {
        backgroundColor: colorOnSelect,
    },
    '&.Mui-selected:hover': {
        backgroundColor: colorOnSelect,
    },
    ':hover': {
        backgroundColor: colorOnSelect,
    }
}));


export {MenuItemButton};