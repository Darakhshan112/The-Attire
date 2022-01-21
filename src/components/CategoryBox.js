import React from 'react'
import { Box, Link, CardActionArea } from '@mui/material'
import AllProducts from './AllProducts'
import Products from '../data_files/products'
import { useMediaQuery } from '@mui/material'
// import bg1 from '../images/categories_bg/bg1.jpg'
import {useNavigate } from 'react-router-dom';

function CategoryBox(props) {
    const navigate = useNavigate();
    const isSmallScreen = useMediaQuery('(max-width:965px)')
    const heading_style = {
        textTransform: "uppercase",
        // letterSpacing : "12px",
        fontSize: "1.7rem",
        display: "block",color: "white",
        // fontFamily: "Roboto"
        // color:"#8928b1"
    }

    const box_style = {
        backgroundImage: `url(${require(`../images/categories_bg/bg${props.id}.jpg`)})`, backgroundSize: 'cover',
        // WebkitFilter: "brightness(85%)",
        backgroundRepeat: 'no-repeat', opacity: "0.9", 
        // height: '69vh', width: '68vw',
        height: '40vh', width:`${isSmallScreen?"80vw":"95%"}`,
        margin: "15px", display: "flex", alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', flexDirection: 'column',
        cursor: "pointer",
    }


    return (

        <Link underline="none" style={{ color: "black",   }} onClick={()=>navigate(`/products/${props.cat}`)}>

            <CardActionArea>
                <Box sx={box_style} >
                <div style={{backgroundColor: "rgba(0, 0, 0, 0.5)", width: "100%", height: "100%", display: "flex", flexDirection:"column",
                        // justifyContent: `${isSmallScreen?:"end"}`,
                        justifyContent:"center",
                         alignItems: "center"
                    }}>
                    <p  style={heading_style}>{props.cat}</p>
                    <p style={{color: "white"}}>IN STORES AND ONLINE</p>
                    </div>
                </Box>
            </CardActionArea>
            
        </Link>
    )
}

export default CategoryBox
