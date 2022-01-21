import React from 'react'
import "./settings.css";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';

import FormControl from '@mui/material/FormControl';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Settings = ({ currentUser, setCurrentUser, setUsers }) => {
  const [values, setValues] = React.useState({
    name: currentUser.name,
    email: currentUser.email,
    phoneno: currentUser.phoneno,
    shipping: currentUser.shippingaddress,
    billing: currentUser.billingaddress
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
const [open, setOpen] = React.useState(false);
const [openError, setOpenError] = React.useState(false);
const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpen(false);
  setOpenError(false);
};
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  function handleSaveDetails() {
    const updUser = {
      id: currentUser.id,
      name: values.name,
      password: currentUser.password,
      email: values.email,
      shippingaddress: values.shipping,
      billingaddress: values.billing,
      phoneno: values.phoneno,
      status: currentUser.status
    };
    // console.log(updUser);
    if(Object.values(updUser).filter((str)=>str === null || str.toString().match(/^ *$/) !== null).length >0)
    {
      setOpenError(true);
      return;
    }
    setCurrentUser(updUser);
    setUsers((prev_users) => {
      console.log(prev_users[currentUser.id]);
      prev_users[currentUser.id] = updUser
      return { ...prev_users };
    });
    setOpen(true);
  }
  return (
    <div className='container-fluid'>
      <h1 className='fontstyle' style={{ marginTop: "70px", marginLeft: '30px' }}>Settings</h1>
      <div className='container' style={{ margin: '0 10% 0 15%', padding: "", border: '2px solid #9a78b3' }}>

        <div style={{ textAlign: "center" }}>
          <h3 className='fontstyle'>Account Details</h3>
          <hr />
          <TextField value={values.name} onChange={handleChange('name')} sx={{ margin: "2px 0px", width: '60%' }} required color="secondary" id="outlined-basic" label="Full Name" variant="outlined" />
          <br /><br /><TextField value={values.email} onChange={handleChange('email')} sx={{ margin: "2px 0px", width: '60%' }} required color="secondary" id="outlined-basic" label="Email" variant="outlined" />
          {/* <FormControl sx={{ margin:"2px 0px",width: '60%' }} required color="secondary" variant="outlined" > */}
          {/* <InputLabel htmlFor="outlined-adornment-password" >New Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            required
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
          <FormControl sx={{ margin:"2px 0px",width: '60%' }} color="secondary" variant="outlined">
          <InputLabel required htmlFor="outlined-adornment-password" >Confirm Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            required
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
          </FormControl> */}

          <br /><br /><TextField value={values.billing} onChange={handleChange('billing')} required id="outlined-basic" color="secondary" sx={{ margin: "2px 0px", width: '60%' }} label="Billing Address" variant="outlined" />
          <br /><br /><TextField value={values.shipping} onChange={handleChange('shipping')} required id="outlined-basic" color="secondary" sx={{ margin: "2px 0px", width: '60%' }} label="Shipping Adress" variant="outlined" />
          <br /><br /><TextField value={values.phoneno} onChange={handleChange('phoneno')} required id="outlined-basic" color="secondary" sx={{ margin: "2px 0px", width: '60%' }} label="Phone No." variant="outlined" />
          <hr />
          <Button onClick={handleSaveDetails} variant="contained" style={{ marginTop: "10px", marginBottom: '10px' }} color="secondary">Save Changes</Button>
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}
      anchorOrigin={{horizontal:"center", vertical:"top"}}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Details saved successfully
        </Alert>
      </Snackbar>
      <Snackbar open={openError} autoHideDuration={1500} onClose={handleClose}
      anchorOrigin={{horizontal:"center", vertical:"top"}}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          All fields are required
        </Alert>
      </Snackbar>
    </div>
  )
}
