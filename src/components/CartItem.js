import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { ButtonGroup } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

export default function MediaControlCard({ userid, id, name, price, quantity, setCarts, stock , url}) {

    function handleRemoveItem(id) {
        setCarts(
            prev_carts => {
                delete prev_carts[userid].product_ids[id];
                prev_carts[userid].total -= price * quantity;
                prev_carts[userid].total_items -= quantity;
                return { ...prev_carts };
            }
        );
    }

    function incrementQuantity(id) {
        setCarts(
            prev_carts => {
                prev_carts[userid].product_ids[id].quantity += 1;
                prev_carts[userid].total += price;
                prev_carts[userid].total_items += 1;
                return { ...prev_carts };
            }
        );
    }
    function decrementQuantity(id) {
        setCarts(
            prev_carts => {
                prev_carts[userid].product_ids[id].quantity -= 1;
                prev_carts[userid].total -= price;
                prev_carts[userid].total_items -= 1;
                return { ...prev_carts };
            }
        );
    }

    return (
        <Card sx={{ display: 'flex', height: 150, border: "1px solid #9a78b3", m: 1, mb: 2, boxShadow: 6 }}>
            <CardMedia
                component="img"
                sx={{ height: 150, width: 120 }}
                // image="https://picsum.photos/600"
                image={process.env.PUBLIC_URL +`/clothes/${url}`}
                alt="Image"
            />
            <Box sx={{ display: 'flex', alignItems: 'start', width: "100%", pl: 1.5 }}>

                <CardContent sx={{ width: "100%", p: 1 }}>
                    <Box sx={{ alignItems: "start", display: "flex", justifyContent: "space-between" }}>
                        <Typography component="div" sx={{ color: "#9a78b3", pt: 1 }}>
                            {name}
                        </Typography>
                        <IconButton sx={{ p: 1, m: 0 }} onClick={() => handleRemoveItem(id)}>
                            <CloseRoundedIcon fontSize="small" />
                        </IconButton>
                    </Box>
                    <Typography variant="subtitle3" color="text.secondary" component="div">
                        ~ Rs. {price}
                    </Typography>
                    <ButtonGroup sx={{ display: "flex", alignItems: "center" }} disableElevation variant="contained">
                        <IconButton disabled={quantity <= 1 ? true : false} onClick={() => decrementQuantity(id)}>
                            <RemoveRoundedIcon />
                        </IconButton>
                        <Typography variant="subtitle3" color="text.secondary" component="div"
                            sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: 40, height: 30, textAlign: "center", border: "1px solid #9a78b3", borderRadius: 1.5 }} >
                            {quantity}
                        </Typography>
                        <IconButton disabled={quantity >= stock ? true : false} onClick={() => incrementQuantity(id)}>
                            <AddRoundedIcon />
                        </IconButton>
                    </ButtonGroup>
                    {/* <ButtonGroup size="small" sx={{ mt: 1.5 }} disableElevation variant="contained">
                        <Button color="secondary" sx={{width: 40, p: 0, m: 0,bgcolor:"#9a78b3"}}>
                            <RemoveRoundedIcon />
                        </Button>
                        <Typography variant="subtitle3" color="text.secondary" component="div"
                        sx={{p:1,width: 20,textAlign:"center", borderTop:"1px solid #9a78b3",borderBottom:"1px solid #9a78b3"}} >
                            1
                        </Typography>
                        <Button color="secondary" sx={{width: 40, p: 0, m: 0,bgcolor:"#9a78b3"}}>
                            <AddRoundedIcon />
                        </Button>
                    </ButtonGroup> */}
                    <Typography align='right' sx={{ mt: 1.5 }} variant="subtitle3" color="text.secondary" component="div">
                        Total: Rs. {price * quantity}
                    </Typography>
                </CardContent>
            </Box>

        </Card>
    );
}