
import CalculatorSquare from "./CalculatorSquare";
import ResultArea from "./ResultArea";
import {useState} from "react";

export default function Calculator() {

    const allButtons = [
        {
            buttonLabel: 'AC',
            type: 'additional',
        },
        {
            buttonLabel: '+/-',
            type: 'additional',
        },
        {
            buttonLabel: '%',
            type: 'additional',
        },
        {
            buttonLabel: '/',
            type: 'action',
        },
        {
            buttonLabel: 7,
            type: 'digit',
        },
        {
            buttonLabel: 8,
            type: 'digit',
        },
        {
            buttonLabel: 9,
            type: 'digit',
        },
        {
            buttonLabel: '*',
            type: 'action',
        },
        {
            buttonLabel: 4,
            type: 'digit',
        },
        {
            buttonLabel: 5,
            type: 'digit',
        },
        {
            buttonLabel: 6,
            type: 'digit',
        },
        {
            buttonLabel: '-',
            type: 'action',
        },
        {
            buttonLabel: 1,
            type: 'digit',
        },
        {
            buttonLabel: 2,
            type: 'digit',
        },
        {
            buttonLabel: 3,
            type: 'digit',
        },
        {
            buttonLabel: '+',
            type: 'action',
        },
        {
            buttonLabel: 0,
            type: 'digit',
        },
        {
            buttonLabel: '.',
            type: 'digit',
        },
        {
            buttonLabel: '=',
            type: 'equally',
        }
    ]

    const [firstNumber, setFirstNumber] = useState('');
    const [secondNumber, setSecondNumber] = useState('');
    const [operation, setOperation] = useState('')
    const [result, setResult] = useState('')

    const calculate = (percent) => {
        if (secondNumber === '') return 0;

        let newResult;
        const first = Number(firstNumber);
        const second = percent ? (first / 100 * Number(secondNumber)) : Number(secondNumber) ;
        switch (operation) {
            case '+':
                newResult = first + second;
                break;
            case '-':
                newResult = first - second;
                break;
            case '*':
                newResult = first * second;
                break;
            case '/':
                newResult = first / second;
                break;
            default:
                newResult = '';
        }
        return String(+newResult.toFixed(12))
    }

    const buttonHandler = (calcSymbol, type) => {

        if (type === 'digit') {
            if (operation === '') {
                const newFirstNumber = firstNumber + calcSymbol;
                setFirstNumber(newFirstNumber)
                setResult('')
            } else {
                const newSecondNumber = secondNumber + calcSymbol;
                setSecondNumber(newSecondNumber)
            }
        }

        if (type === 'action' && operation === '') {
            if (firstNumber === '') {
                setOperation(calcSymbol)
                setFirstNumber(result)
                setResult('')
            } else {
                setOperation(calcSymbol)
            }
        }

        if (type === 'action' && operation !== '') {
            let newResult = calculate();
            setFirstNumber(newResult)
            setOperation(calcSymbol);
            setSecondNumber('')
        }

        if (type === 'equally') {
            let newResult = calculate();
            setResult(newResult)
            setFirstNumber('')
            setOperation('')
            setSecondNumber('')
        }

        if (calcSymbol === '+/-'){
            if (operation !== '' && secondNumber !== '') {
                const newNumber = String(-Number(secondNumber))
                setSecondNumber(newNumber)
            }

            if (operation !== '' && secondNumber === '') {
                const newNumber = '-'
                setSecondNumber(newNumber)
            }

            if (operation === '') {
                const newNumber = String(-Number(firstNumber))
                setFirstNumber(newNumber)
            }

            if (operation === '' && firstNumber === '') {
                const newNumber = '-'
                setFirstNumber(newNumber)
            }
        }

        if (calcSymbol === 'AC'){
            setFirstNumber('')
            setSecondNumber('')
            setOperation('')
            setResult('')
        }

        if (calcSymbol === '%') {
            if (result !== '') setResult(result / 100);
            if (result === '' && secondNumber === '') {
                setResult(firstNumber / 100)
                setFirstNumber('')
            }
            if (firstNumber !== '' && secondNumber !== '') {
                const percentResult = calculate(true)
                setResult(percentResult)
                setFirstNumber('')
                setSecondNumber('')
                setOperation('')
            }
        }

    }


    return (
        <div>
            <h2>Calculator</h2>
            {/*{firstNumber} {' '} {operation} {' '} {secondNumber} = {result}*/}
            <ResultArea firstNumber={firstNumber} secondNumber={secondNumber} result={result} />
            <CalculatorSquare buttonHandler={buttonHandler} allButtons={allButtons}/>
        </div>
    )
}