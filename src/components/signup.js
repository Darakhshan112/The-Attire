import React,{useState,useEffect} from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';

import FormControl from '@mui/material/FormControl';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CloseIcon from '@mui/icons-material/Close';
// import User from '../data_files/user';

import "./login.css";

export const Signup = (props) => {
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  useEffect(() => {
    userdata["password"]=values.password;
    
  }, [values])
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const [confirmvalues, setconfirmValues] = React.useState({
    cpassword: '',
    cshowPassword: false,
  });
  const handleconfirmChange = (prop) => (event) => {
    setconfirmValues({ ...values, [prop]: event.target.value });
  };
  useEffect(() => {
    userdata["cpass"]=confirmvalues.password;
    
  }, [confirmvalues])
  const handleClickconfirmShowPassword = () => {
    setconfirmValues({
      ...confirmvalues,
      cshowPassword: !confirmvalues.cshowPassword,
    });
  };
  function close()
  {
    props.close();
    props.setstate(false);
  }
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [userdata, setdata] = useState({
    name:"",
    email:"",
    phone:"",
    password:"",
    billadd:"",
    shipadd:"",
    cpass:"",
  })

  const inputEvent=(event)=>{
    const {name,value}=event.target;
    setdata((preval)=>{
      return{
        ...preval,
        [name]:value,
      }
    })};




    

    return (
     <>
      {/* <div style={{display:"flex",justifyContent:"space-between"}}>
       <h2 className='br-name'>The Attire</h2>
     <IconButton
          onClick={close}
        >
          <CloseIcon sx={{color:"#9a78b3"}}/>
        </IconButton>
        </div> */}
      <form className='form' >
      <div style={{ display: "flex", justifyContent: "right" }}>
      <IconButton
          onClick={close}
        >
          <CloseIcon sx={{color:"#9a78b3"}}/>
        </IconButton>
        </div>
      <h2 className='login-head br-name' >Signup</h2>
      <div  style={{margin:'30px auto', textAlign:'center'}}>

      <TextField value={userdata.name} color="secondary" name="name" onChange={inputEvent}  sx={{  width: '60%' }} label="Full Name" variant="outlined" required={true} style={{margin:'5px', backgroundColor:"white"}} />
      <TextField value={userdata.email} color="secondary"  name="email" onChange={inputEvent}   sx={{  width: '60%' }} label="Email" variant="outlined" required={true} style={{margin:'5px', backgroundColor:"white"}} />
      <FormControl sx={{ m: 1, width: '60%' }} color="secondary" variant="outlined" style={{margin:'5px', backgroundColor:"white"}}>
          <InputLabel htmlFor="outlined-adornment-password" required={true} >Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          </FormControl>
      <FormControl sx={{ m: 1, width: '60%' }} color="secondary" variant="outlined" style={{margin:'5px', backgroundColor:"white"}}>
          <InputLabel htmlFor="outlined-adornment-password" required={true} >Confirm Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={confirmvalues.cshowPassword ? 'text' : 'password'}
            value={confirmvalues.cpassword}
            onChange={handleconfirmChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickconfirmShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {confirmvalues.cshowPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          </FormControl>

      <TextField value={userdata.phone} color="secondary"  name="phone" onChange={inputEvent}  sx={{  width: '60%' }} label="Phone No." variant="outlined" required={true} style={{margin:'5px', backgroundColor:"white"}} />
      <TextField value={userdata.billadd} color="secondary"  name="billadd" onChange={inputEvent}  sx={{  width: '60%' }} label="Billing Address" variant="outlined" required={true} style={{margin:'5px', backgroundColor:"white"}} />
      <TextField value={userdata.shipadd} color="secondary"  name="shipadd" onChange={inputEvent}  sx={{  width: '60%' }} label="Shipping Address" variant="outlined" required={true} style={{margin:'5px', backgroundColor:"white"}} />
<br />
      <Button className='login-button' color="secondary" variant="contained" sx={{backgroundColor:'#9a78b3', marginTop:"20px"}} onClick={props.updateuser(userdata)}>Signup</Button>
      </div>
      </form>
      </>
    )
}

