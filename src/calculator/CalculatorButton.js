export default function CalculatorButton(props) {

    return (
        <button href="#"
                id={props.calcButton.buttonLabel === 0 ? 'calcButton0' : 'calcButton'}
                className={props.calcButton.type}
                onClick={() => props.buttonHandler(props.calcButton.buttonLabel, props.calcButton.type)}
        >
            {props.calcButton.buttonLabel}
        </button>
    )
}