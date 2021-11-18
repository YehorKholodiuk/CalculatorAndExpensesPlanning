import newYork from './images/image1.jpeg';
import Square from "./catalog/Square";

function ActivitiesBooking() {

    const products = [{
        id: 1,
        name: 'Manhattan bus Excursion',
        productImage: newYork,
        price: 300,
        onSale: true,
        available: true,
    },
        {
            id: 2,
            name: 'Empire State Building tour',
            productImage: newYork,
            price: 100,
            onSale: true,
            available: true,
        },
        {
            id: 3,
            name: 'Helicopter tour',
            productImage: newYork,
            price: 700,
            onSale: false,
            available: true,
        },
        {
            id: 4,
            name: 'Statue of Freedom boat tour',
            productImage: newYork,
            price: 200,
            onSale: true,
            available: false,
        }
    ]

    const discountAmount = 20;

    return (
        <div className="App">
            <h2>New York Activities</h2>


            <Square discountAmount={discountAmount} products={products}/>

        </div>
    );
}

export default ActivitiesBooking;