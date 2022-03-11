
import CategoryBox from './CategoryBox';
import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';

import { useMediaQuery } from '@mui/material'
import { useNavigate } from 'react-router-dom';

function Landing() {
    const navigate = useNavigate();
    const isSmallScreen = useMediaQuery('(max-width:965px)')
    // const product_category=[...new Set(Object.values(Products).map(item=>item.category))];
    const product_category = ["Tshirt", "Dresses", "Pants", "Bracelets", 'Earrings', 'Footwear'];


    return (
        <div style={{ marginTop: "10vh", }}>
            <div style={{ display: "flex", justifyContent: "center", }}>
                <div style={{
                    backgroundImage: `url(${require(`../images/categories_bg/bg.jpg`)})`,
                    backgroundSize: "cover", backgroundPosition: "center", width: "100vw", height: "90vh",
                    // WebkitFilter: "brightness(60%)",

                }}>
                    <div style={{
                        backgroundColor: "rgba(0, 0, 0, 0.3)", width: "100%", height: "100%", display: "flex",
                        // justifyContent: `${isSmallScreen?:"end"}`,
                        justifyContent:"center",
                         alignItems: "center"
                    }}>
                        <Box sx={{
                            // mr: `${isSmallScreen?"0":"10%"}`,
                            // border:"1px solid black", 
                            // width: `${isSmallScreen ? "80%" : "35%"}`,
                            width:"90%",
                            height: "80%",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            backgroundColor: "rgba(0, 0, 0, 0.4)", boxShadow: "0 0 20px 20px rgba(0, 0, 0, 0.4)",
                        }}>
                            <Typography variant="h5" sx={{
                                textAlign: "center",
                                color: "white",
                                fontFamily: "Roboto"
                            }}>
                                <span style={{ fontSize: 35, fontFamily: "Lucida Handwriting" }}>The Attire</span>
                                <br />
                                One place for all your clothing needs
                                <br /><br /><br />
                                <Button variant="contained"
                                    onClick={()=>navigate('/products')}
                                    color="secondary"
                                    size="large"
                                    sx={{ bgcolor: "#7e5c96", boxShadow: 10,fontFamily: "Roboto" }}>
                                    Shop Now
                                </Button>
                            </Typography>
                        </Box>
                    </div>
                </div>
            </div>
            <Grid
                container
                spacing={2}
                direction={isSmallScreen ? "column" : "row"}
                alignItems="center"
                justifyContent="space-around"

                style={{ minHeight: '100vh', marginTop: "50px", }}
            >
                {product_category.map((category, i) => {
                    return <Grid item xs={6}>

                        <CategoryBox key={i + 1} cat={category} id={i + 1} />
                    </Grid>
                })}


            </Grid>

        </div>
    )
}

export default Landing
