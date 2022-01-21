import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link'
import { styled } from '@mui/material/styles';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import BorderAllRoundedIcon from '@mui/icons-material/BorderAllRounded';
import { useNavigate } from 'react-router-dom';
import SettingsApplicationsRoundedIcon from '@mui/icons-material/SettingsApplicationsRounded';

import Products from '../data_files/products';

const product_category = [...new Set(Object.values(Products).map(item => item.category))];
const settings = ['Add Product', 'Delete Product'];

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));


export default function TemporaryDrawer({ state, setState, isAdmin }) {

    const navigate = useNavigate();
    const toggleDrawer = (open, event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState(open);
    };

    const list = () => (
        <>
            <DrawerHeader>
                <ListItem button onClick={() => setState(false)}>
                    <IconButton
                        onClick={() => setState(false)}
                        aria-label="close"
                    >
                        <ChevronLeftRoundedIcon />
                    </IconButton>
                </ListItem>
            </DrawerHeader>
            <Divider />
            <Box
                sx={{ width: 250 }}
                role="presentation"
                onClick={(e) => toggleDrawer(false, e)}
                onKeyDown={(e) => toggleDrawer(false, e)}
            >
                
                <List>
                {
                    isAdmin &&
                    <><ListItem>
                        <ListItemIcon>
                            <SettingsApplicationsRoundedIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Products  Settings"/>
                    </ListItem>
                    <Divider/>
                    {settings.map((text, index) => (
                        <ListItem button key={text} component={Link} onClick={()=>text == "Add Product"?navigate('/product/add'):navigate('/product/del')}>
                            <ListItemText sx={{ pl: 7 }} primary={text} />
                        </ListItem>
                    ))}
                    <Divider/>
                    </>
                    }
                    <ListItem button component={Link} onClick={()=>navigate('/products')} >
                        <ListItemIcon>
                            <BorderAllRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary="All Products"/>
                    </ListItem>
                    
                    <ListItem >
                        <ListItemIcon>
                            <CategoryRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Categories" />
                    </ListItem>
             {product_category.map((text, index) => (
                        <ListItem button key={text} component={Link} onClick={()=>navigate(`/products/${text}`)}>
                            <ListItemText sx={{ pl: 7 }} primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider/>
                   
            </Box>
        </>
    );

    return (
        <Drawer
            anchor='left'
            open={state ? true : false}
            onClose={() => setState(false)}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
        >
            {list()}
        </Drawer>
    );
}