import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

const orderstatus = [
  {
    value: 'Pending',
    label: 'Pending',
  },
  {
    value: 'Delivered',
    label: 'Delivered',
  },
  {
    value: 'Out for Delivery',
    label: 'Out for Delivery',
  },

];
function Accordian(props) {
  const [s, sets] = React.useState(0);
  const [status, setstatus] = React.useState('Pending');
  const handleChange = (id) => (event) => {
    setstatus(event.target.value);

    props.updatestatus(event.target.value, id)


  }

 
  return (
    <>
      <Accordion style={{ marginBottom: "10px", border: "1px solid #9a78b3", borderRadius: "10px" }} sx={{ boxShadow: 5 }} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >

          <Grid container spacing={2} lg={12}  >
            <Grid item lg={6} md={6} sm={6}>
              <span style={{ fontWeight: "bold" }}>Order Id: &nbsp;</span>{props.item.id}
            </Grid>

            <Grid item lg={6} md={6} sm={6} >
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 0, width: '20ch', borderColor: "#9a78b3" },
                  '& .MuiTextField-root': {
                    '& fieldset': {
                      borderColor: '#9a78b3'
                    }
                  }
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                  <TextField
                    id="outlined-select-status"
                    select
                    value={status}
                    onChange={handleChange(props.item.id)}
                    size="small"
                  >
                    {orderstatus.map((option) =>
                    (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))
                    }
                  </TextField>
                </div>
              </Box>
            </Grid>

            <Grid item lg={6} md={6} sm={6} >
              <span style={{ fontWeight: "bold" }}>Name: &nbsp;</span>{props.item.name}
            </Grid>

            <Grid item lg={6} md={6} sm={6}>
              <span style={{ fontWeight: "bold" }}>Phone No: &nbsp;</span> {props.item.phoneno}
            </Grid>

            <Grid item lg={6} md={6} sm={6}>
            {props.item.ids.map((_item) => {
              props.item.total =props.item.total + (_item["price"]*_item["quantity"])
            })}
            
            <span style={{ fontWeight: "bold" }}>Total(Rs): &nbsp;</span>{props.item.total/2}
            </Grid>

            <Grid item lg={6} md={6} sm={6}>
              <span style={{ fontWeight: "bold" }}>Date: &nbsp;</span>{props.item.date}
            </Grid>

            <Grid item lg={6} md={6} sm={6}>
              <span style={{ fontWeight: "bold" }}>Shipping Address: &nbsp;</span>{props.item.shippingaddress}
            </Grid>

            <Grid item lg={6} md={6} sm={6}>
              <span style={{ fontWeight: "bold" }}>Billing Address: &nbsp;</span> {props.item.billingaddress}
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper} sx={{ border: "1px solid #9a78b3", my: 1 }}>
            <Table sx={{ minWidth: 300 }} size="small" aria-label="a dense table">
              <TableBody>
                <TableRow
                  key={props.item.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align='left' style={{ fontWeight: "bold" }} >Name</TableCell>
                  <TableCell align='left' style={{ fontWeight: "bold" }}>Quantity</TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>Price</TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>Color</TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>Fabric</TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>Category</TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>Total(Rs)</TableCell>
                </TableRow>

                {props.item.ids.map((_item) => {
                 
                  return (
                    <>
                      <TableRow
                        key={props.item.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align='left' >{_item["name"]}</TableCell>
                        <TableCell align='left'>{_item["quantity"]}</TableCell>
                        <TableCell align='left'>{_item["price"]}</TableCell>
                        <TableCell align='left'>{_item["color"]}</TableCell>
                        <TableCell align='left'>{_item["fabric"]}</TableCell>
                        <TableCell align='left'>{_item["category"]}</TableCell>
                        <TableCell align='left'>{_item["price"]*_item["quantity"]}</TableCell>
                      </TableRow>
                    </>
                  )
                })
                }

              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
    </>
  )
}

export default Accordian

