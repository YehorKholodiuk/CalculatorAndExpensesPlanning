import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import IconButtons from "./IconButtons";

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-content',
    },
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: 120,
    },
    formControlLabel: {
        marginTop: theme.spacing(1),
    },
}));

const useInputStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function EditModal(props) {

    const classesInput = useInputStyles();
    const classes = useStyles();
    const fullWidth = true;
    const maxWidth = 'lg';

    const {toggle, openModal, editData} = props;

    const [expenses, setExpenses] = useState( editData.data && editData.data.children ? [...editData.data.children] : [])
    const [typeOfModal, setTypeOfModal] = useState(editData.typeOfModal)

    const handleInputChange = (event) => {
        const eventNames = event.target.name.split(' ')
        const name = eventNames.slice(0, -1).join(' ');
        const amountOrPercent = eventNames.slice(-1).join(' ');
        const newValues = expenses.map(el => el.name !== name ? el : (amountOrPercent === 'amount') ? {...el, amount: Number(event.target.value)}: {...el, percentAmount: Number(event.target.value)})
        setExpenses(newValues);
        countTotalAmount();
        totalPercent()
    }

    useEffect(() => {
        countTotalAmount();
        totalPercent()
    }, [expenses])

    const [totalExpenses, setTotalExpenses] = useState( editData.data ? editData.data.amount : null)
    const [totalExpensesPercent, setTotalExpensesPercent] = useState(editData.data ? editData.data.percent : null)

    const countTotalAmount = () => {
        const totalExpenses = expenses.map(el => el.amount).reduce((acc, curr) => acc + curr, 0);
        setTotalExpenses(totalExpenses)
    }

    const totalPercent = () => {
        const totalPercent = expenses.map(el => el.percentAmount).reduce((acc, curr) => acc + curr, 0);
        setTotalExpensesPercent(totalPercent)
    }

    console.log(editData)

    const saveButtonHandler = () => {
        switch (typeOfModal) {
            case 'editIncome':
                props.editIncome(newIncome, editData.data.id)
                toggle('close')
                break;
            case 'editExpenses':
                props.editExpenses(editData.data.id, expenses, totalExpenses, totalExpensesPercent)
                toggle('close')
                break;
            case 'alert':
                setTypeOfModal('editExpenses')
                break;
            default:
                console.log('EDIT ERROR')
                toggle('close')
        }
    }

    const [newIncome, setNewIncome] = useState(editData.data ? editData.data.amount : null)


    return (
        <React.Fragment>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={openModal}
                onClose={toggle}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle
                    id="max-width-dialog-title">{typeOfModal !== 'alert' ? 'Edit ' + editData.data.name : "Warning"}</DialogTitle>

                { typeOfModal === 'editIncome' &&
                <>
                    <DialogContent>
                        <DialogContentText>
                            You can write here you`re monthly income.
                        </DialogContentText>
                        <form className={classes.form} noValidate>
                            <FormControl className={classes.formControl}>
                                <form className={classesInput.root} noValidate autoComplete="off">
                                    <TextField
                                        id="standard-basic"
                                        label="income amount"
                                        value={newIncome}
                                        onChange={(e) => setNewIncome(Number(e.target.value))}
                                    />
                                </form>
                            </FormControl>
                        </form>
                    </DialogContent>
                </>
                }

                { typeOfModal === 'editExpenses' &&
                <>
                    <DialogContent>

                        <TableRow>
                            <TableCell align="right">Expenses</TableCell>
                            <TableCell align="center">Percent</TableCell>
                            <TableCell align="center">Amount</TableCell>
                            <TableCell align="right">Weekly</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="right">Total</TableCell>
                            <TableCell align="center">{totalExpensesPercent}%</TableCell>
                            <TableCell align="center">{totalExpenses}</TableCell>
                            <TableCell align="right">{''}</TableCell>
                            <TableCell align="right">{''}</TableCell>
                        </TableRow>
                        {expenses.map(expensesItem =>

                            <TableRow key={expensesItem.name}>
                                <TableCell component="th" scope="row">
                                    {expensesItem.name}
                                </TableCell>

                                <TableCell align="right">

                                    <form className={classes.form} noValidate>
                                        <FormControl className={classes.formControl}>
                                            <form className={classesInput.root} noValidate autoComplete="off">
                                                <TextField
                                                    placeholder={'percents'}
                                                    value={expensesItem.percentAmount}
                                                    onChange={handleInputChange}
                                                    name={`${expensesItem.name} percent`}
                                                />
                                            </form>
                                        </FormControl>
                                    </form>
                                </TableCell>

                                <TableCell align="right">

                                    <form className={classes.form} noValidate>
                                        <FormControl className={classes.formControl}>
                                            <form className={classesInput.root} noValidate autoComplete="off">
                                                <TextField
                                                    placeholder={'expenses amount'}
                                                    value={expensesItem.amount}
                                                    onChange={handleInputChange}
                                                    name={`${expensesItem.name} amount`}
                                                />
                                            </form>
                                        </FormControl>
                                    </form>
                                </TableCell>

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
                        )}

                    </DialogContent>
                </>}

                { typeOfModal === 'alert' &&

                <DialogTitle
                    id="max-width-dialog-title">
                    You should cut your basic expenses to {editData.rightBasicExpenses}.
                </DialogTitle>

                }

                <DialogActions>
                    <Button onClick={saveButtonHandler} color="primary">
                        { typeOfModal === 'alert' ? 'OK' : 'Save'}
                    </Button>
                    <Button onClick={() => toggle('close')} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}