import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
const Accordian = (props) => {

    return (
        <>
            <Accordion style={{ marginBottom: "10px", border: "1px solid #9a78b3", borderRadius: "10px" }} sx={{ boxShadow: 5 }} >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Grid container spacing={2} lg={12} >
                        <Grid item lg={6} md={6} sm={6}>
                            <span style={{ fontWeight: "bold" }}>Order Id: &nbsp;</span>{props.item.id}
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} >
                            <span style={{ fontWeight: "bold" }}>Status:  &nbsp; </span>{props.item.status}
                        </Grid>
                        {props.item.ids.map((_item) => {
                            props.item.total = props.item.total + (_item["price"] * _item["quantity"])
                        })}
                        <Grid item lg={6} md={6} sm={6}>
                            <span style={{ fontWeight: "bold" }}>Total(Rs):  &nbsp;</span>{props.item.total/2}
                        </Grid>

                        <Grid item lg={6} md={6} sm={6}>
                            <span style={{ fontWeight: "bold" }}>Date:  &nbsp;</span>{props.item.date}
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
                                    <TableCell align='left' style={{ fontWeight: "bold" }}>Name</TableCell>
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
                                                <TableCell align='left'>{_item["name"]}</TableCell>
                                                <TableCell align='left'>{_item["quantity"]}x</TableCell>
                                                <TableCell align='left'>{_item["price"]}</TableCell>
                                                <TableCell align='left'>{_item["color"]}</TableCell>
                                                <TableCell align='left'>{_item["fabric"]}</TableCell>
                                                <TableCell align='left'>{_item["category"]}</TableCell>
                                                <TableCell align='left'>{_item["price"] * _item["quantity"]}</TableCell>
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

export default Accordian;
