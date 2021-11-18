import {useEffect, useState} from "react";
import TableWrapper from "./TableWrapper";
import EditModal from "./EditModal";

export default function ExpensesTableMain() {

    const futureExpenses = 'For creating my future';
    const shortTermExpenses = 'Short Term Expenses';

    const [dataExpenses, setDataExpenses] = useState([
        {
            id: 0,
            name: 'Income',
            percent: 100,
            amount: null,
            serialNumber: 1,
            children: undefined,
        },
        {
            id: 3,
            name: futureExpenses,
            percent: 30,
            amount: null,
            serialNumber: 2,
            children: [
                {
                    id: 31,
                    name: 'Машина',
                    percentAmount: 10,
                    amount: null,
                },
                {
                    id: 32,
                    name: 'Квартира',
                    percentAmount: 10,
                    amount: null,
                },
                {
                    id: 33,
                    name: 'Резервы',
                    percentAmount: 10,
                    amount: null,
                },
            ],
        },
        {
            id: 1,
            name: 'Basic Expenses',
            percent: null,
            amount: 50000,
            serialNumber: 3,
            children: [
                {
                    id: 11,
                    name: 'Еда',
                    percentAmount: null,
                    amount: 30000,
                },
                {
                    id: 12,
                    name: 'Жилье',
                    percentAmount: null,
                    amount: 10000,
                },
                {
                    id: 14,
                    name: 'Телефон',
                    percentAmount: null,
                    amount: 1000,
                },
                {
                    id: 15,
                    name: 'Передвижение',
                    percentAmount: null,
                    amount: 5000,
                },
                {
                    id: 13,
                    name: 'Косметика',
                    percentAmount: null,
                    amount: 3000,
                },
                {
                    id: 13,
                    name: 'Бытовая химия',
                    percentAmount: null,
                    amount: 1000,
                },
            ],
        },
        {
            id: 2,
            name: 'Short Term Expenses',
            percent: null,
            amount: null,
            serialNumber: 4,
            children: [
                {
                    id: 21,
                    name: 'Косметика',
                    percentAmount: null,
                    amount: null,
                },
                {
                    id: 22,
                    name: 'Подарки',
                    percentAmount: null,
                    amount: null,
                },
                {
                    id: 23,
                    name: 'Отпуск',
                    percentAmount: null,
                    amount: null,
                },
            ],
        },
    ]);

    const editIncome = (newIncome, incomeId) => {
        const newFutureExpenses = newIncome / 100 * dataExpenses.filter(el => el.name === futureExpenses)[0].percent;
        let newSortTermExpenses = 0;
        let newSortTermPercent = 0;
        if (newIncome - dataExpenses.filter(el => el.name === 'Basic Expenses')[0].amount > 0) {
            newSortTermExpenses = newIncome - newFutureExpenses - dataExpenses.filter(el => el.name === 'Basic Expenses')[0].amount;
            newSortTermPercent = newSortTermExpenses / newIncome * 100;
        }
        const newDataExpenses = dataExpenses.map(el => {
                if (el.id === incomeId) return {...el, amount: Number(newIncome)};
                if (el.name === futureExpenses) return {...el, amount: newFutureExpenses};
                if (el.name === shortTermExpenses) return {...el, amount: newSortTermExpenses, percent: newSortTermPercent};
                else return el;
            }
        );
        setDataExpenses(newDataExpenses)
    }

    const editExpenses = (expensesId, children, amount, percentAmount) => {
        const newDataExpenses = dataExpenses.map(el => el.id === expensesId ? {...el, amount,  percentAmount, children} : el);
        setDataExpenses(newDataExpenses)
    }

    const [openModal, setOpenModal] = useState(false);

    const [editData, setEditData] = useState({
            data: null,
            typeOfModal: null,
            rightBasicExpenses: null,
        }
    )

    useEffect(() => {
        const income = dataExpenses.filter(el => el.name === 'Income')[0].amount;
        const forFutureExpenses = dataExpenses.filter(el => el.name === futureExpenses)[0].amount;
        const basics = dataExpenses.filter(el => el.name === 'Basic Expenses')[0].amount;
        if (income && income - basics < forFutureExpenses) {
            const basicExpenses = dataExpenses.filter(el => el.name === 'Basic Expenses')[0];
            setEditData({
                ...editData,
                rightBasicExpenses: income - forFutureExpenses,
                typeOfModal: 'alert',
                data: basicExpenses
            })
            toggle()
        }
    }, [dataExpenses])

    const editButtonHandler = (data, typeOfModal) => {
        setEditData({...editData, data, typeOfModal})
        toggle()
    }

    const toggle = (close) => {
        setOpenModal(!openModal);
        if (close === 'close') setEditData({
            data: null,
            typeOfModal: null,
            rightBasicExpenses: null,
        })
    };

    return (
        <div>
            <TableWrapper editButtonHandler={editButtonHandler} dataExpenses={dataExpenses} />
            {openModal && <EditModal editIncome={editIncome} editExpenses={editExpenses} editData={editData} toggle={toggle} openModal={openModal}/>}
        </div>
    )
}