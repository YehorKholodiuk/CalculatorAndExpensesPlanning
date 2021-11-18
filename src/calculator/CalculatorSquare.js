import CalculatorButton from "./CalculatorButton";

export default function CalculatorSquare(props) {

    return (
        <div className={'calcWrap'}>
            {props.allButtons.map(el =>
                <CalculatorButton
                    key={el.buttonLabel + el.type}
                    buttonHandler={props.buttonHandler}
                    calcButton={el}
                />)}
        </div>
    )
}