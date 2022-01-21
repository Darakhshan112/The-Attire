import  React,{useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import "./settings.css";



export default function Delete({products,setProducts}) {
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 180 },
    { field: 'price', headerName: 'Price', width: 180 },
    {
      field: 'date',
      headerName: 'Date',
      width: 180,
    },
    {
      field: 'category',
      headerName: 'category',
      width: 180
    },
  ];
  
  const rows=[];
Object.values(products).map((item,i)=>{
 
  rows.push({id:item.id,name:item.name,price:item.price,date:item.date,category:item.category})
  i++
})
  
  const [selected, setselected] = useState([])

  const deletefn=()=>{
    console.log(selected)
    selected.map((item)=>{
      Object.values(products).map((elem)=>{
        if(elem.id==item)
        {
          setProducts(
            prevprod=>{
              delete prevprod[item];
              return {...prevprod};
            }
          )
          
        }
      })
    })
  }


  return (
    <>
    <div style={{ height: "90vh", width:"100%", marginTop:"70px", display:"flex", justifyContent:"center", flexDirection:"column" }}>
    <h1 className='fontstyle' style={{ marginTop: "10px", marginLeft: '30px' }}>Delete Product</h1>
      
      <DataGrid onSelectionModelChange={(e)=>{setselected(e)}}
      sx={{boxShadow:3,border:"2px solid purple",width: '65%',margin:"auto"}}
      
        rows={rows}
        columns={columns}
        pageSize={6}
        color="secondary"
        rowsPerPageOptions={[6]}
        checkboxSelection
      />
     
    <Button variant="contained" sx={{width:170,margin:"9px auto",bgcolor:'rgb(154, 120, 179)'}} color="secondary" onClick={deletefn}>Delete Product</Button>
    </div>
    </>
  );
}
