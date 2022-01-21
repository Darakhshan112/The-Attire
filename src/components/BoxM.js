import React,{useState} from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Button } from '@mui/material';
import { Login } from './login';
import { Signup } from './signup';
import User from '../data_files/user';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "60%",
  height:"50%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  // p: 1,
  overflowY: "auto"
};

export default function BoxM() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {setOpen(true)};
  const handleClose = () => setOpen(false);
  const [login, setlogin] = useState(false)
  

  function login_clicked()
  {
    handleOpen();
    setlogin(true);
  }
  const [signup, setsignup] = useState(false)
  function signup_clicked()
  {
    handleOpen();
    setsignup(true);
  }
  const [userdetail, setuserdetail] = useState([...new Set(Object.values(User))])
  const id=Object.keys(userdetail).length+1
  const updateuser=(data)=>(event)=>{
    console.log(userdetail)
    setuserdetail((prevdata)=>{
      prevdata[id]={userid:id,
    name:data.name,
    email:data.email,
    password:data.password,
    shippingaddress:data.shipadd,
    billingaddress:data.billadd,
    phoneno:data.phone}
    
    return ([...new Set(Object.values(prevdata))])
  
  })
  
}
  return (
    <div>
      <Button onClick={login_clicked}>Login</Button>
      <Button onClick={signup_clicked}>Signup</Button>

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
            {login?<Login close={handleClose} setstate={setlogin} userdetail={userdetail}/>:handleClose}
            {signup?<Signup close={handleClose} setstate={setsignup} updateuser={updateuser}/>:handleClose}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
