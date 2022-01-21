import React,{useState,useEffect} from 'react'
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import "./add_product.css";


export default function AddProduct({setProducts,products}) {
    const [value, setValue] = React.useState(new Date());
    const [url,seturl]=React.useState("");
    

    useEffect(() => {
      productdata["date"]=value;
      
    }, [value]) 
    const [productdata, setdata] = useState({
      name:"",
      price:"",
      stock:"",
      category:"",
      fabric:"",
      color:"",
      date:"",
      description:"",
    })
    const inputEvent=(event)=>{
      const {name,value}=event.target;
      setdata((preval)=>{
        return{
          ...preval,
          [name]:value,
        }
      })};
      const [openError2, setOpenError2] = React.useState(false);
      const handleClose2 = (event, reason) => {
          if (reason === 'clickaway') {
              return;
          }
  
          setOpenError2(false);
      };
      const [openError1, setOpenError1] = React.useState(false);
      const handleClose1 = (event, reason) => {
          if (reason === 'clickaway') {
              return;
          }
  
          setOpenError1(false);
      };
      const [openSuccess, setOpenSuccess] = React.useState(false);
const handleCloseSuccess = (event, reason) => {

        setOpenSuccess(false);
    };
      const [openSuccess2, setOpenSuccess2] = React.useState(false);
const handleCloseSuccess2 = (event, reason) => {

        setOpenSuccess2(false);
    };
    const upload=()=>{
      if(document.getElementById("image").value=="")
    {
      setOpenError1(true);
      return;
    }
      seturl(document.getElementById("image").value.split("\\").pop());
      console.log(url)
      setOpenSuccess(true);
        }
      const [openError3, setOpenError3] = React.useState(false);
    const handleClose3 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenError3(false);
    };

      const productid = parseInt(Object.keys(products)[(Object.keys(products).length)-1]) + 1;
    const addproduct=()=>{
      if (Object.values(productdata).filter((str) => str === null || str.toString().match(/^ *$/) !== null).length > 0) {
        setOpenError2(true);
        return;
    }
      if(url=="")
      {
        setOpenError3(true);
        return;
      }
      setProducts(
        (prev_prod) => {
          const product = {
              id: productid,
              name: productdata.name,
              url: url,
            price: productdata.price,
            stock: productdata.stock,
            category: productdata.category,
            fabric:productdata.fabric,
            color: productdata.color,
            date: productdata.date,
            description:productdata.description
          };
          prev_prod[`${productid}`] = product
          return ({ ...prev_prod })
        }
        )
        setOpenSuccess2(true);
    }


    return (
        <div className='container-fluid'>
            <h1 className='fontstyle' style={{marginTop:"5%",marginLeft:'30px'}}>Add Product</h1>
            <div className='container-fluid' style={{border:'1px solid #9a78b3',margin:'0 10% 0 15%',textAlign:"center"}}>
                <h2 className='fontstyle'>Product Details</h2>
                <label>Upload Image : </label>
                <input id="image" type="file"></input><br/>
                <Button variant="contained" style={{marginTop:"20px",marginBottom:'20px'}} color="secondary" onClick={upload}>Upload</Button><br/>
                <TextField required={true}  id="outlined-basic" label="Name" value={productdata.name} color="secondary" name="name" onChange={inputEvent}  variant="outlined"  sx={{  margin:"2px 0px",width: '60%' }}  />
                <TextField required={true}  id="outlined-basic" label="Price"  value={productdata.price} color="secondary" name="price" onChange={inputEvent}   variant="outlined"  sx={{  margin:"2px 0px",width: '60%' }}  />
                <TextField required={true}  id="outlined-basic" label="Stock"  value={productdata.stock} color="secondary" name="stock" onChange={inputEvent}   variant="outlined"  sx={{  margin:"2px 0px",width: '60%' }}  />
                <TextField required={true}  id="outlined-basic" label="Category"  value={productdata.category} color="secondary" name="category" onChange={inputEvent}   variant="outlined"  sx={{  margin:"2px 0px",width: '60%' }}  />
                <TextField required={true}  id="outlined-basic" label="Fabric"  value={productdata.fabric} color="secondary" name="fabric" onChange={inputEvent}   variant="outlined"  sx={{  margin:"2px 0px",width: '60%' }}  />
                <TextField required={true}  id="outlined-basic" label="Color"  value={productdata.color} color="secondary" name="color" onChange={inputEvent}   variant="outlined"  sx={{  margin:"2px 0px",width: '60%' }}  />
                <LocalizationProvider dateAdapter={AdapterDateFns} >
      <Stack spacing={3}   sx={{  margin:"4px auto",width: '60%' }}>
        
        <DesktopDatePicker
          label="For date"
          value={value}
          minDate={new Date('2017-01-01')}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField required={true} {...params} />}
        />
        
      </Stack>
    </LocalizationProvider>
                <TextField required={true}  id="outlined-basic" label="Description"  value={productdata.description} color="secondary" name="description" onChange={inputEvent}   variant="outlined"  sx={{  margin:"2px 0px",width: '60%' }} />
                <br />
                <Button variant="contained" style={{marginTop:"20px",marginBottom:'20px'}} color="secondary" onClick={addproduct}>Add Product</Button>
            </div>
            <Snackbar open={openError3} autoHideDuration={1500} onClose={handleClose3}
                anchorOrigin={{ horizontal: "center", vertical: "top" }}>
                <Alert onClose={handleClose3} severity="error" sx={{ width: '100%' }}>
                    Please upload the image first.
                </Alert>
            </Snackbar>
            <Snackbar open={openSuccess} autoHideDuration={1500} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} onClose={handleCloseSuccess} sx={{ display: "flex", alignItems: "center", justifyItems: "center", height: "100vh" }}>
                <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%', p: 5 }}>
                    The image has been uploaded successfully.<br /><br />
                </Alert>
            </Snackbar>
            <Snackbar open={openSuccess2} autoHideDuration={1500} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} onClose={handleCloseSuccess2} sx={{ display: "flex", alignItems: "center", justifyItems: "center", height: "100vh" }}>
                <Alert onClose={handleCloseSuccess2} severity="success" sx={{ width: '100%', p: 5 }}>
                    The product has been added successfully.<br /><br />
                </Alert>
            </Snackbar>
            <Snackbar open={openError2} autoHideDuration={1500} onClose={handleClose2}
                anchorOrigin={{ horizontal: "center", vertical: "top" }}>
                <Alert onClose={handleClose2} severity="error" sx={{ width: '100%' }}>
                    All fields are required
                </Alert>
            </Snackbar>
            <Snackbar open={openError1} autoHideDuration={1500} onClose={handleClose1}
                anchorOrigin={{ horizontal: "center", vertical: "top" }}>
                <Alert onClose={handleClose1} severity="error" sx={{ width: '100%' }}>
                    Please select the image first.
                </Alert>
            </Snackbar>
        </div>
    )
}
