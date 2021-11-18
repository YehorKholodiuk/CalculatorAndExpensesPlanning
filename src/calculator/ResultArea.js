export default function ResultArea(props) {

    return (
        <div className={'calcResultArea'}>
            { props.result !== '' ? props.result : props.secondNumber !== '' ? props.secondNumber : props.firstNumber}
        </div>
    )
}