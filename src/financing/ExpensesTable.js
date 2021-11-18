import { Table } from 'antd';
import React, {useState} from "react";
import { Button } from 'antd';
import ModalUpdate from "./ModalUpdate";


export default function ExpensesTable (props) {

    const [openModal, setOpenModal] = React.useState(false);

    const toggle = () => {
        setOpenModal(!openModal);
    };

    const buttonTagIncome = <Button onClick={toggle}> set income </Button>;
    const buttonTagUpdate = <><Button> Update </Button>{' '}<Button> Delete </Button></>;
    const buttonTagAddExpense = <Button> add new expense </Button>

    const columnsExpenses = [
        {
            title: 'Expenses',
            dataIndex: 'expenses',
            key: 'expenses',
        },
        {
            title: 'Percent / Amount',
            dataIndex: 'percentAmount',
            key: 'percentAmount',
            width: '15%',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            width: '20%',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            width: '25%',
        },
    ];

    const [dataExpenses, setDataExpenses] = useState([
        {
            key: 0,
            expenses: 'Income',
            percentAmount: '100%',
            amount: 300000,
            actions: buttonTagIncome,
        }, {
            key: 1,
            expenses: 'Basic Expenses',
            percentAmount: null,
            amount: 20000,
            actions: buttonTagAddExpense,
            children: [
                {
                    key: 11,
                    expenses: 'Еда',
                    percentAmount: null,
                    amount: 10000,
                    actions: buttonTagUpdate,
                },
                {
                    key: 12,
                    expenses: 'Жилье',
                    percentAmount: null,
                    amount: 10000,
                    actions: buttonTagUpdate,
                },
                {
                    key: 13,
                    expenses: 'Бытовая химия',
                    percentAmount: null,
                    amount: 10000,
                    actions: buttonTagUpdate,
                },
                {
                    key: 14,
                    expenses: 'Телефон',
                    percentAmount: null,
                    amount: 10000,
                    actions: buttonTagUpdate,
                },
                {
                    key: 15,
                    expenses: 'Передвижение',
                    percentAmount: null,
                    amount: 10000,
                    actions: buttonTagUpdate,
                },
            ],
        },
        {
            key: 2,
            expenses: 'Short Term Expenses',
            percentAmount: null,
            amount: 20000,
            actions: buttonTagAddExpense,
            children: [
                {
                    key: 21,
                    expenses: 'Косметика',
                    percentAmount: '5%',
                    amount: 10000,
                    actions: buttonTagUpdate,
                },
                {
                    key: 22,
                    expenses: 'Подарки',
                    percentAmount: '5%',
                    amount: 10000,
                    actions: buttonTagUpdate,
                },
                {
                    key: 23,
                    expenses: 'Отпуск',
                    percentAmount: '5%',
                    amount: 10000,
                    actions: buttonTagUpdate,
                },
            ],
        },
        {
            key: 3,
            expenses: 'Long Term Expenses',
            percentAmount: '15%',
            amount: null,
            actions: buttonTagAddExpense,
            children: [
                {
                    key: 31,
                    expenses: 'Машина',
                    percentAmount: '5%',
                    amount: 10000,
                    actions: buttonTagUpdate,
                },
                {
                    key: 32,
                    expenses: 'Квартира',
                    percentAmount: '5%',
                    amount: 10000,
                    actions: buttonTagUpdate,
                },
                {
                    key: 33,
                    expenses: 'Резервы',
                    percentAmount: '5%',
                    amount: 10000,
                    actions: buttonTagUpdate,
                },
            ],
        }
    ]);



    const [inputIncome, setInputIncome] = useState('')




    return (
        <>
            <h2>Monthly Expenses Plan</h2>
            <Table
                columns={columnsExpenses}
                //rowSelection={{ ...rowSelection, checkStrictly }}
                dataSource={dataExpenses}
            />
            <ModalUpdate toggle={toggle} openModal={openModal}/>
        </>
    )
};