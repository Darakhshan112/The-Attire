
import React, { useEffect, useState } from 'react'
import { IconButton } from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

function UpButton() {
  function moveUp() {
    window.scrollTo(0, 0);
  }

  const [btnDisplay, setbtnDisplay] = useState("none")
  const listenScrollEvent = () => {
    window.scrollY > 100
      ? setbtnDisplay("block")
      : setbtnDisplay("none")
  }
  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent)
  })
  return (
    <div>
      <IconButton onClick={moveUp} sx={{ borderRadius:15,bgcolor: "#9a78b3",border:"1px solid #9a78b3",color:"black",boxShadow:15, position: "fixed", bottom: "10%", right: "5%", display: btnDisplay }}>
        <ArrowDropUpIcon sx={{fontSize:20}}/>
      </IconButton>
    </div>
  )
}

export default UpButton
