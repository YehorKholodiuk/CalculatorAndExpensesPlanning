import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableRowAndCells from "./TableRowAndCells";


export default function TableWrapper(props) {


    const rows = [...props.dataExpenses];

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Expenses / Income</TableCell>
                        <TableCell align="right">Percent / Amount</TableCell>
                        <TableCell align="right">Amount</TableCell>
                        <TableCell align="right">Amount per week</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.sort((a, b) => a.serialNumber - b.serialNumber).map((row) => (
                        <TableRowAndCells
                            editButtonHandler={props.editButtonHandler}
                            key={row.id} row={row}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}