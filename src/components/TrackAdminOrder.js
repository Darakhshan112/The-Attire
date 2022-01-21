import React, { useState } from 'react';
// import product from "../data_files/product";
// import order from "../data_files/orders";
import Accordian from "./Accordian";
import AdminAccordian from "./AdminAccordian";
// import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
// import FactCheckIcon from '@mui/icons-material/FactCheck';
import Typography from '@mui/material/Typography'

function TrackAdminOrder({ currentUser, order, setOrders }) {
    const user = currentUser.status;
    const [adminorder, setadminorder] = useState([...new Set(Object.values(order))])
    const [userorder, setuserorder] = useState(Object.values(order).filter((item) => item.userid == currentUser.id))
    const updateorderstatus = (statusvalue, orderid) => {
        setOrders((prevorders) => {
            prevorders[orderid].status = statusvalue;
            return (prevorders)

        })
    }
    return (
        <>
            <h1 style={{ textAlign: "center", marginTop: "70px" }}>Track Orders</h1>
            <Grid container style={{ backgroundColor: "red" }} justifyContent="center">
                <Box sx={{ flexGrow: 1, }} style={{ position: "absolute", top: "30%", width: "77vw" }} >
                    <Grid container spacing={2} lg={12} style={{ width: "auto" }}>
                        <Grid item xs={12} style={{ width: "auto" }}>
                            {
                                adminorder.length == 0 &&
                                <Typography variant="subtitle3" color="text.secondary" component="div"
                                    sx={{ textAlign: "center", mt: 2, }} >
                                    No Orders To Show
                                </Typography>
                            }
                            {
                                user == "admin" && adminorder.length > 0 && adminorder.map((item) => {
                                    return (<AdminAccordian key={item.id} item={item} updatestatus={updateorderstatus}></AdminAccordian>)
                                })
                            }
                            {
                                userorder.map((item) => {
                                    if (item.userid == currentUser.id) {
                                        console.log(item, "itemm")
                                        return (<Accordian key={item.id} item={item}></Accordian>)
                                    }
                                })
                            }

                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </>
    )

}
export default TrackAdminOrder