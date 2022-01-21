import React, { useState } from 'react'
import './common.css';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
// import product from "../data_files/product";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useParams } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(3),
    textAlign: 'center',

    color: theme.palette.text.secondary,
}));

function Singleproduct({product, setCarts, currentUser}) {
    const [open, setOpen] = React.useState(false);
const [openError, setOpenError] = React.useState(false);
const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpen(false);
};
    const params = useParams();
    const id = params.id;
    const [count, setcount] = useState(1)
    const [minusdisable, setminusdisable] = useState(true)
    const [plusdisable, setplusdisable] = useState(false)
    // const [singleproduct, setsingleproduct] = useState([...new Set(Object.values(product))])
    const [singleproduct, setsingleproduct] = useState(product[id])
    let [cart,setcart]=useState([]);
    console.log(singleproduct);
    const AddToCart = (stockval) => (event) => {
        // setsingleproduct((prevdata) => {
        //     prevdata.stock -= stockval
        //     return ([...new Set(Object.values(prevdata))])

        // })
        setCarts(
            prev_carts => {
                const userid = currentUser == null ? "unknown":currentUser.id;
                console.log(prev_carts[userid]);
                prev_carts[userid].product_ids[id] = singleproduct;
                // {
                //     id:id,
                //     name:singleproduct["name"],
                //     url:singleproduct["url"],
                //     price:singleproduct["price"],
                //     stock:singleproduct["stock"],
                //     category:singleproduct["category"],
                //     fabric:singleproduct["fabric"],
                //     color:singleproduct["color"],
                //     date:singleproduct["date"],
                //     description:singleproduct["description"]
                // }
                prev_carts[userid].product_ids[id]["quantity"] = count;
                let total = 0; let totItem = 0;
                if(Object.values(prev_carts[userid].product_ids).length > 0)
                {Object.values(prev_carts[userid].product_ids).forEach(
                    (p) =>
                    {
                        total += p.price * p.quantity;
                        totItem += p.quantity;
                    }
                )}
                
                prev_carts[userid].total = total;
                prev_carts[userid].total_items = totItem;
                return { ...prev_carts };
            }
        );
        setOpen(true);

    }  
    const Decreament = () => {
        if (count > 1 && count - 1 !== 1) {
            setplusdisable(false);
            setminusdisable(false);
            setcount(count - 1)
        }
        else if (count > 1 && count - 1 === 1) {
            setcount(count - 1)
            setminusdisable(true)
        }
        else {
            setminusdisable(true);
        }
    }
    const Increament = () => {
        if (count < singleproduct["stock"] && count + 1 !== singleproduct["stock"]) {
            setminusdisable(false);
            setplusdisable(false);
            setcount(count + 1)
        }
        else if (count < singleproduct["stock"] && count + 1 === singleproduct["stock"]) {
            setcount(count + 1)
            setplusdisable(true);
        }
        else {
            setplusdisable(true);
        }
    }
    return (
        <>
            <h1 style={{ textAlign: "center", color: "#9a78b3" }}>{singleproduct["name"]}</h1>
            <Grid container style={{ backgroundColor: "blue" }} justifyContent="center">
                <Box sx={{ flexGrow: 1, }} style={{ position: "absolute", top: "30%", width: "77vw" }}>
                    <Grid container spacing={2} lg={12} className="showdiv">
                        <Grid item xs={12} md={6} className="showdiv">
                            <Item container style={{ border: "1px solid #9a78b3", borderRadius: "10px" }} sx={{ boxShadow: 5 }} ><img src={process.env.PUBLIC_URL +`/clothes/${product[id]["url"]}`} alt="..." style={{ width: "100%", height: "auto" }} /></Item>
                        </Grid>
                        <Grid item xs={12} md={6} className="showdiv" style={{ paddingLeft: "30px" }}>
                            <p><span style={{ fontWeight: "bold", color: "#9a78b3" }}>Product Name: &nbsp;</span>{singleproduct["name"]}</p>

                            <p><span style={{ fontWeight: "bold", color: "#9a78b3" }}>Price(Rs): &nbsp;</span>{singleproduct["price"]}</p>

                            <p><span style={{ fontWeight: "bold", color: "#9a78b3" }}>Category: &nbsp;</span>{singleproduct["category"]}</p>

                            <p><span style={{ fontWeight: "bold", color: "#9a78b3" }}>Stock: &nbsp;</span>{singleproduct["stock"]}</p>

                            <p><span style={{ fontWeight: "bold", color: "#9a78b3" }}>Fabric: &nbsp;</span>{singleproduct["fabric"]}</p>

                            <p><span style={{ fontWeight: "bold", color: "#9a78b3" }}>Color: &nbsp;</span>{singleproduct["color"]}</p>
                            <p><span style={{ fontWeight: "bold", color: "#9a78b3" }}>Description: &nbsp;</span>{product[id]["description"]}</p>
                        </Grid>                      
                        <Grid item xs={12} md={12} className="showdiv" style={{ textAlign: "center" }}>
                            <h2><Button variant="contained" onClick={Decreament} disabled={minusdisable} style={{ backgroundColor: "#9a78b3" }}><RemoveIcon style={{ color: "white" }} /></Button><span>&nbsp;&nbsp;&nbsp;&nbsp;{count}&nbsp;&nbsp;&nbsp;&nbsp;</span><Button variant="contained" color="secondary" onClick={Increament} style={{ backgroundColor: "#9a78b3" }} disabled={plusdisable} ><AddIcon style={{ color: "white" }} /></Button></h2>
                            <Button variant="contained" color="secondary" style={{ marginBottom: "20px", backgroundColor: "#9a78b3" }} onClick={AddToCart(count)}><ShoppingCartIcon /> &nbsp;Add to Cart</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
            <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}
      anchorOrigin={{horizontal:"center", vertical:"top"}}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Product Added To Cart
        </Alert>
      </Snackbar>
        </>
    )
}
export default Singleproduct