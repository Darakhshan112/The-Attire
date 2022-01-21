import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { useMediaQuery, Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { IconButton, TableFooter, Typography, Tooltip } from '@mui/material';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import ReceiptRoundedIcon from '@mui/icons-material/ReceiptRounded';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
// import SendIcon from '@mui/icons-material/Send';
// import { useNavigate } from "react-router-dom";

import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { v4 as uuidv4 } from 'uuid';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function Checkout({ carts, setCarts, products, currentUser, setOrders }) {
    const navigate = useNavigate();
    const [order, setOrder] = React.useState({});
    const [openSuccess, setOpenSuccess] = React.useState(false);
    const [openError, setOpenError] = React.useState(false);
    const [cart, setCart] = React.useState(carts[currentUser.id]);
    const handleCloseSuccess = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        navigate('/');
        setCarts((prev_carts) => {
            prev_carts[currentUser.id]["product_ids"] = {};
            prev_carts[currentUser.id]["total"] = 0;
            prev_carts[currentUser.id]["total_items"] = 0;

            return { ...prev_carts };
        })
        // setCart({});
        setOpenSuccess(false);
    };

    const handleCloseError = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenError(false);
    };
    function allProductsInStock() {
        Object.values(cart.product_ids).forEach(
            (product) => {
                if (product.quantity > products[product.id]["stock"])
                    return false;
            }
        )
        return true;
    }

    function handlePlaceOrder() {
        let order = {};
        const d = new Date();
        order["id"] = uuidv4().toUpperCase().slice(0, 5);
        order["userid"] = currentUser.id;
        order["name"] = currentUser.name;
        order["email"] = currentUser.email;
        order["date"] = `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
        order["status"] = "pending";
        order["total"] = cart.total + 200;
        order["ids"] = Object.values(cart.product_ids);
        order["shippingaddress"] = currentUser.shippingaddress;
        order["billingaddress"] = currentUser.billingaddress;
        order["phoneno"] = currentUser.phoneno;
        let aPIS = allProductsInStock();
        setOrder(order);
        if (aPIS) setOrders((prev_orders) => {
            prev_orders[order.id] = order;
            return { ...prev_orders };
        });
        aPIS ? setOpenSuccess(true) : setOpenError(true);
    }
    const isSmallScreen = useMediaQuery('(max-width:965px)');
    const styles = isSmallScreen ?
        {
            box: { mt: 10, mb: 2, py: 2, flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between" },
            item: { width: "100%" },
            stickyItem: { width: "100%", my: 2 }

        }
        :
        {
            box: { mt: 10, mb: 2, py: 2, flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "space-between" },
            item: { width: "60%", },
            stickyItem: { position: "sticky", alignSelf: "flex-start", top: "17%", width: "35%" }

        }
        ;
    // const navigate = useNavigate();
    // navigate('/user/orders')
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <Box sx={styles.box} >
                    <Item sx={styles.item} elevation={4}>
                        <TableContainer component={Paper} sx={{ border: "1px solid #9a78b3", height: "100%" }}>
                            <Typography sx={{ py: 1, color: "#9a78b3", display: "flex", alignItems: "center", textAlign: "center", justifyContent: "center" }}>
                                <ReceiptRoundedIcon sx={{ fontSize: 25 }} /> &nbsp;&nbsp;Order Summary
                            </Typography>
                            <Table sx={{ minWidth: 300 }} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Quantity</TableCell>
                                        <TableCell align="left">Product Name</TableCell>
                                        <TableCell align="right">Price&nbsp;(Rs.)</TableCell>
                                        <TableCell align="right">Total&nbsp;(Rs.)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Object.keys(cart.product_ids).map(
                                        (product_id) => {
                                            const product = cart.product_ids[product_id];
                                            return (
                                                <TableRow
                                                    key={product.name}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {product.quantity}x
                                                    </TableCell>
                                                    <TableCell align="left">{product.name}</TableCell>
                                                    <TableCell align="right">{product.price}</TableCell>
                                                    <TableCell align="right">{product.price * product.quantity}</TableCell>
                                                </TableRow>);
                                        }
                                    )}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TableCell colSpan="4" align="right">&nbsp;</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell colSpan="3" align="right">Subtotal</TableCell>
                                        <TableCell align="left">{cart.total}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell colSpan="3" align="right">Delivery Charges</TableCell>
                                        <TableCell align="left">Rs. 200</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell colSpan="3" align="right">Total Bill</TableCell>
                                        <TableCell align="left">{cart.total + 200}</TableCell>
                                    </TableRow>

                                </TableFooter>
                            </Table>
                        </TableContainer>
                    </Item>
                    <Item elevation={7} sx={styles.stickyItem}>
                        <TableContainer component={Paper} sx={{ border: "1px solid #9a78b3", my: 1 }}>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "end" }}>
                                <Typography sx={{ p: 1, color: "#9a78b3", width: "100%", display: "flex", alignItems: "center", textAlign: "center", justifyContent: "center" }}>
                                    <ManageAccountsRoundedIcon sx={{ fontSize: 25 }} /> &nbsp;&nbsp;Your Details
                                </Typography>
                                <Tooltip title="Edit">
                                    <IconButton sx={{ color: "#9a78b3" }} onClick={() => navigate('/settings')} >
                                        <ModeEditIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            <Table sx={{ minWidth: 300 }} size="small" aria-label="a dense table">

                                <TableBody>
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align='left'>
                                            Name
                                        </TableCell>
                                        <TableCell align="right">{currentUser.name}</TableCell>
                                    </TableRow>
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align='left'>
                                            Email
                                        </TableCell>
                                        <TableCell align="right">{currentUser.email}</TableCell>
                                    </TableRow>
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align='left'>
                                            Phone No
                                        </TableCell>
                                        <TableCell align="right">{currentUser.phoneno}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TableContainer component={Paper} sx={{ border: "1px solid #9a78b3", mt: 2 }}>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "end" }}>
                                <Typography sx={{ p: 1, color: "#9a78b3", width: "100%", display: "flex", alignItems: "center", textAlign: "center", justifyContent: "center" }}>
                                    <LocalShippingRoundedIcon sx={{ fontSize: 25 }} /> &nbsp;&nbsp;Shipping Details
                                </Typography>
                                <Tooltip title="Edit">
                                    <IconButton sx={{ color: "#9a78b3" }} onClick={() => navigate('/settings')}  >
                                        <ModeEditIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            <Table sx={{ minWidth: 300 }} size="small" aria-label="a dense table">

                                <TableBody>
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align='left'>
                                            Payment Type
                                        </TableCell>
                                        <TableCell align="right">Cash On Delivery (COD)</TableCell>
                                    </TableRow>
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align='left'>
                                            Shipping Address
                                        </TableCell>
                                        <TableCell align="right">{currentUser.shippingaddress}</TableCell>
                                    </TableRow>
                                    <TableRow
                                        key={currentUser.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align='left'>
                                            Billing Address
                                        </TableCell>
                                        <TableCell align="right">{currentUser.billingaddress}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Button variant="contained" color="secondary" sx={{ mt: 3, mb: 1 }} onClick={handlePlaceOrder}>Place Order&nbsp;<ShoppingCartCheckoutIcon sx={{ fontSize: 20 }} /></Button>

                        <Snackbar open={openSuccess} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} onClose={handleCloseSuccess} sx={{ display: "flex", alignItems: "center", justifyItems: "center", height: "100vh" }}>
                            <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%', p: 5 }}>
                                Your order has been placed. <br />Order ID: {order.id} <br />Total Bill: Rs. {order.total} <br /><br />

                                <Button variant="outline" sx={{ border: "1px solid white", borderRadius: 1.5, color: "white" }} 
                                onClick={() => {
                                    navigate('/user/orders'); setCarts((prev_carts) => {
                                        prev_carts[currentUser.id]["product_ids"] = {};
                                        prev_carts[currentUser.id]["total"] = 0;
                                        prev_carts[currentUser.id]["total_items"] = 0;

                                        return { ...prev_carts };
                                    })
                                }}>Go to Orders</Button>
                            </Alert>
                        </Snackbar>
                        <Snackbar open={openError} autoHideDuration={1500} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} onClose={handleCloseError} sx={{ display: "flex", alignItems: "center", justifyItems: "center", height: "100vh" }}>
                            <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%', p: 5 }}>
                                Sorry for inconvenience. <br /> Some products are out of Stock!
                            </Alert>
                        </Snackbar>
                    </Item>
                </Box>
            </Container>
        </React.Fragment>
    );
}