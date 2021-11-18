import Booking from "../booking/Booking";

export default function ProductCard(props) {

    return (
        <div className={'productCard'}>
            <h3>{props.product.name}</h3>
            <img className={"productImage"}
                 src={props.product.productImage}
                 alt="excursion-1"
            />
            <div>Price:

                ${props.product.onSale ?
                    props.product.price :
                    <><span className={'priceBeforeSale'}>{props.product.price}</span>
                        {' '}{props.product.price / 100 * (100 - props.discountAmount)} </>}
            </div>

            <p>Available {props.product.available ? 'today' : 'tomorrow'}</p>

            <Booking />
        </div>
    )
}