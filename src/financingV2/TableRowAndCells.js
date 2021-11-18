import React, {useState} from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";
import IconButtons from "./IconButtons";

export default function TableRowAndCells(props) {

    const useRowStyles = makeStyles({
        root: {
            '& > *': {
                borderBottom: 'unset',
            },
        },
    });

    const { row } = props;

    const [open, setOpen] = useState(false);
    const classes = useRowStyles();


    return (
        <React.Fragment>
            <TableRow className={classes.root && row.name === 'Income' ? 'income' : 'expenses'}>
                <TableCell>
                    { row.children !== undefined && <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>}
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="right">{row.percent}{row.percent? '%' : null}</TableCell>
                <TableCell align="right">{row.amount}</TableCell>
                <TableCell align="right">{row.amount / 4}</TableCell>
                <TableCell align="right">
                    <IconButtons
                        row={row}
                        addIcon={row.name !== 'Income'}
                        updateIcon={true}
                        editButtonHandler={props.editButtonHandler}
                    />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            {(row.children !== undefined) &&
                            <>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Expenses</TableCell>
                                            <TableCell>Percent</TableCell>
                                            <TableCell align="right">Amount</TableCell>
                                            <TableCell align="right">Amount per week</TableCell>
                                            <TableCell align="right">Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {row.children.map((expensesItem) => (

                                            <TableRow key={expensesItem.name}>
                                                <TableCell component="th" scope="row">
                                                    {expensesItem.name}
                                                </TableCell>
                                                <TableCell>{expensesItem.percentAmount}{row.percent ? '%' : null}</TableCell>
                                                <TableCell align="right">{expensesItem.amount}</TableCell>
                                                <TableCell align="right">
                                                    {expensesItem.amount / 4}
                                                </TableCell>
                                                <TableCell align="right">
                                                    <IconButtons
                                                        row={expensesItem}
                                                        deleteIcon={true}
                                                        updateIcon={false}
                                                        editButtonHandler={props.editButtonHandler}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </>}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

TableRowAndCells.propTypes = {
    row: PropTypes.shape({
        expenses: PropTypes.string.isRequired,
        percent: PropTypes.number,
        amount: PropTypes.number.isRequired,
        history: PropTypes.arrayOf(
            PropTypes.shape({
                expenses: PropTypes.string.isRequired,
                percentAmount: PropTypes.number.isRequired,
                amount: PropTypes.number.isRequired,
            }),
        ),
    }).isRequired,
};