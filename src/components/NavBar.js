import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import useMediaQuery from '@mui/material/useMediaQuery';
import OptionsSideBar from './OptionsSideBar';
import CartSideBar from './CartSideBar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
import Backdrop from '@mui/material/Backdrop';
// import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { useState } from "react";
import { Login } from './login';
import { Signup } from './signup';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "60%",
    height: "90%",
    bgcolor: 'background.paper',
    border: '4px double #9a78b3',
    boxShadow: 24,
    // p: 1,
    overflowY: "auto"
};

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto"
    }
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
}));

const StyledInputBase = styled(InputBase, { shouldForwardProp: (prop) => prop !== 'isSmallScreen' })(({ theme, isSmallScreen }) => {
    let width = isSmallScreen ? "100rem" : "100%";
    return ({
        color: "inherit",
        "& .MuiInputBase-input": {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create("width"),
            width: width,
            [theme.breakpoints.up("sm")]: {
                width: "12ch",
                "&:focus": {
                    width: "20ch"
                }
            }
        }
    })
});


const NavBar = ({ carts, setCarts, products, currentUser, setCurrentUser, users, setUsers }) => {
    const [openSuccess, setOpenSuccess] = React.useState(false);

    const navigate = useNavigate();
    const settings = currentUser !== null ? ["Orders", "Account", "Logout"] : ["Login", "Signup"];
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [OpenSearchBar, setOpenSearchBar] = React.useState(false);
    const [OpenOptionsSideBar, setOpenOptionsSideBar] = React.useState(false);
    const [OpenCartSideBar, setOpenCartSideBar] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => { setOpen(true) };
    const handleClose = () => setOpen(false);
    const [login, setlogin] = useState(false)
    const [login_click, setloginclick] = useState(false)
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    function login_clicked() {
        setloginclick(true);
        handleOpen();
        setsignup(false);
        setlogin(true);
    }
    const [signup, setsignup] = useState(false)
    function signup_clicked() {
        handleOpen();
        setloginclick(false);
        setlogin(false);
        setsignup(true);
    }
    // const [userdetail, setuserdetail] = useState([...new Set(Object.values(User))])
    const [openError2, setOpenError2] = React.useState(false);
    const handleClose2 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenError2(false);
    };
    const [openError3, setOpenError3] = React.useState(false);
    const handleClose3 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenError3(false);
    };
    const updateuser = (data) => (event) => {
        if (Object.values(data).filter((str) => str === null || str.toString().match(/^ *$/) !== null).length > 0) {
            setOpenError2(true);
            return;
        }
        if(data.password!==data.cpass)
        {
            setOpenError3(true);
            return;
        }
        const userid = Object.keys(users).length + 1;
        setUsers((prev_users) => {
            const user = {
                id: userid,
                name: data.name,
                email: data.email,
                password: data.password,
                shippingaddress: data.shipadd,
                billingaddress: data.billadd,
                phoneno: data.phone,
                status: "user"
            };
            prev_users[`${userid}`] = user
            return ({ ...prev_users })
        })
        setCarts((prev_carts) => {
            prev_carts[`${userid}`] = { userid: `${userid}`, product_ids: {}, total: 0, total_items: 0 };
            return ({ ...prev_carts });
        });

        setsignup(false);
        setOpenSuccess(true);
        setlogin(true);
        // handleClose();
        // <Login close={handleClose} setstate={setlogin} opensuccess={setOpenSuccess} setCurrentUser={setCurrentUser} users={users} signup_clicked={signup_clicked}/>
    }
    function handleSearch(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            navigate(`/products/search/${searchQuery}`);
        }
    }
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    function handleClicks(option) {
        if (option == 'Login') { login_clicked(); handleCloseUserMenu(); }
        else if (option == 'Signup') { signup_clicked();; handleCloseUserMenu(); }
        else if (option == 'Account') { navigate('/settings');; handleCloseUserMenu(); }
        else if (option == 'Orders' && currentUser.status == "admin") { navigate('/admin/orders'); handleCloseUserMenu(); }
        else if (option == 'Orders' && currentUser.status == "user") { navigate('/user/orders'); handleCloseUserMenu(); }
        else if (option == 'Logout') { setCurrentUser(null); navigate('/'); handleCloseUserMenu(); };
    }

    const handleCloseSuccess = (event, reason) => {

        setOpenSuccess(false);
    };
    return (
        <>
            <Snackbar open={openSuccess} autoHideDuration={1500} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} onClose={handleCloseSuccess} sx={{ display: "flex", alignItems: "center", justifyItems: "center", height: "100vh" }}>
                <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%', p: 5 }}>
                    {login_click ? "You have successfully logged in." : "You have successfully Signed Up."}<br /><br />
                </Alert>
            </Snackbar>
            <AppBar sx={{ backgroundColor: "#9a78b3" }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 1 }}
                            onClick={() => setOpenOptionsSideBar(true)}
                        >
                            <MenuRoundedIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: "pointer", fontFamily: "Lucida Handwriting" }} onClick={() => navigate('/')}>
                            The&nbsp;Attire
                        </Typography>
                        {isSmallScreen ? <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="search"
                            onClick={() => setOpenSearchBar(!OpenSearchBar)}
                        >
                            <SearchIcon />
                        </IconButton>
                            :
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    isSmallScreen={isSmallScreen}
                                    inputProps={{ "aria-label": "search" }}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    // id="searchBar"
                                    onKeyUp={handleSearch}
                                />
                            </Search>
                        }

                        <Box sx={{ flexGrow: 0, ml: 1 }}>
                            <Tooltip title={currentUser === null ? "Login / Signup" : "Open settings"}>
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    {
                                        currentUser !== null && currentUser !== undefined
                                            ?
                                            <Avatar sx={{ bgcolor: "#676569", }}>{currentUser.name !== undefined ? currentUser.name[0] : 'U'}</Avatar>
                                            :
                                            <AccountCircleIcon sx={{ color: "white", fontSize: 30 }} />
                                    }
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: "45px" }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right"
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right"
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={() => handleClicks(setting)}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <Box sx={{ flexGrow: 0, ml: 2 }}>
                            <IconButton
                                onClick={() => setOpenCartSideBar(true)}
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="cart">
                                <ShoppingCartIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </Container>
                {OpenSearchBar && isSmallScreen &&
                    <Search sx={{ mb: 0.2, }}>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            isSmallScreen={isSmallScreen}
                            inputProps={{ "aria-label": "search" }}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            // id="searchBar2"
                            onKeyUp={handleSearch}
                        />
                    </Search>
                }
                {OpenOptionsSideBar && <OptionsSideBar state={OptionsSideBar} setState={setOpenOptionsSideBar} isAdmin={currentUser !== null && currentUser.status == "admin" ? true : false} />}
                {OpenCartSideBar && <CartSideBar state={CartSideBar} setState={setOpenCartSideBar} carts={carts} setCarts={setCarts} products={products} currentUser={currentUser} />}
            </AppBar>
            <Modal

                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                // onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open} >
                    <Box sx={style} >
                        {login ? <Login close={handleClose} setstate={setlogin} opensuccess={setOpenSuccess} setCurrentUser={setCurrentUser} users={users} signup_clicked={signup_clicked} /> : handleClose}
                        {signup ? <Signup close={handleClose} setstate={setsignup} updateuser={updateuser} /> : handleClose}
                    </Box>
                </Fade>
            </Modal>
            <Snackbar open={openError2} autoHideDuration={1500} onClose={handleClose2}
                anchorOrigin={{ horizontal: "center", vertical: "top" }}>
                <Alert onClose={handleClose2} severity="error" sx={{ width: '100%' }}>
                    All fields are required
                </Alert>
            </Snackbar>
            <Snackbar open={openError3} autoHideDuration={1500} onClose={handleClose3}
                anchorOrigin={{ horizontal: "center", vertical: "top" }}>
                <Alert onClose={handleClose3} severity="error" sx={{ width: '100%' }}>
                    Password and Confirm Password does not match.
                </Alert>
            </Snackbar>
        </>
    );
};
export default NavBar;
