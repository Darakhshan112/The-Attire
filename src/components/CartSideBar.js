import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import { styled } from '@mui/material/styles';
import CartItem from './CartItem';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';
import { useNavigate } from "react-router-dom";


const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));

const DrawerFooter = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 0),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));


export default function TemporaryDrawer({ state, setState, carts, setCarts, products, currentUser }) {
    const navigate = useNavigate();

    const cartUserID = currentUser !== null ? currentUser.id: "unknown";
    // console.log("currentuser",currentUser)
    // console.log("cart",cart)
    const list = () => (
        <>
            <DrawerHeader sx={{ bgcolor: "#9a78b3", boxShadow: 5, p: 0 }}>

                <ListItem button
                    onClick={() => setState(false)}
                    aria-label="close"
                    sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "start", alignItems: "center" }}
                >
                    <IconButton>
                        <ChevronRightRoundedIcon sx={{ color: "white", }} />
                    </IconButton>
                    <Typography component="div" variant="text" sx={{ fontSize: 20, pl: 3, color: "white", marginLeft: "15%" }}>
                        Shopping Cart
                    </Typography>
                </ListItem>
            </DrawerHeader>
            <Divider />
            <Box
                sx={{ width: 350, overflow: "auto", mb:10 }}
                role="presentation"
            >
                {Object.keys(carts[cartUserID].product_ids).length > 0 &&
                    <Typography variant="subtitle3" color="text.secondary" component="div"
                        sx={{ mt: 2, pb: 2, pl: 2, textAlign: "left", borderBottom: "1px solid #9a78b3" }} >
                        <table width="100%">
                            <tbody>
                                <tr>
                                    <td>Total Items:</td>
                                    <td>{carts[cartUserID].total_items}</td>
                                </tr>
                                <tr>
                                    <td>Subtotal :</td>
                                    <td>Rs. {carts[cartUserID].total}</td>
                                </tr>
                                <tr>
                                    <td>Standard Delivery Charges : </td>
                                    <td>Rs. 200</td>
                                </tr>
                                <tr>
                                    <td>Total Amount : </td>
                                    <td>Rs. {carts[cartUserID].total + 200}</td>
                                </tr>
                            </tbody>
                        </table>
                    </Typography>
                }
                <List>
                    {
                        Object.keys(carts[cartUserID].product_ids).length > 0
                            ?
                            Object.keys(carts[cartUserID].product_ids).map(
                                (product_id) => {
                                    // console.log("product id",product_id)
                                    const product = carts[cartUserID].product_ids[product_id];
                                    // console.log(product);
                                    return <CartItem key={product.id} userid={carts[cartUserID].userid} id={product.id} name={product.name} price={product.price} quantity={product.quantity} setCarts={setCarts} stock={products[product.id].stock} url={products[product.id].url} />;
                                })
                            :
                            <Typography variant="subtitle3" color="text.secondary" component="div"
                                sx={{ textAlign: "center", mt: 2, }} >
                                No Products In Cart
                            </Typography>
                    }
                    {
                        currentUser == null && Object.keys(carts[cartUserID].product_ids).length > 0 &&
                        <Typography variant="subtitle3" color="text.secondary" component="div"
                                sx={{ textAlign: "center", mt: 2, }} >
                                Please Login To Checkout
                            </Typography>
                    }
                </List>

            </Box>
            <DrawerFooter sx={{ bgcolor: "#9a78b3", p: 0, boxShadow: "0px 0px 13px grey", width: 350, position: "fixed", bottom: 0 }}>
                
                    <ListItem
                        button
                        onClick={()=>{navigate("/checkout");setState(false);}}
                        disabled={currentUser != null ? (Object.keys(carts[cartUserID].product_ids).length > 0 ? false : true) : true}
                        aria-label="close"
                        sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "end", color: "white" }}
                    >
                        <span>
                            Go To Checkout
                        </span>
                        <IconButton
                            onClick={() => setState(false)}
                            aria-label="close"
                        >
                            <ChevronRightRoundedIcon sx={{ color: "white" }} />
                        </IconButton>

                    </ListItem>
            </DrawerFooter>
        </>
    );

    return (
        <Drawer
            anchor='right'
            open={state ? true : false}
            // onClose={() => setState(false)}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
            PaperProps={{
                style: {
                    overflow: "hidden"
                }
            }}
        >
            {list()}
        </Drawer>
    );
}