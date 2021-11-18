import ProductCard from "./ProductCard";


export default function Square(props) {

    return (
        <div className={'wrap'}>
            {props.products.map(el => <ProductCard key={el.id} product={el} discountAmount={props.discountAmount}/>)}

        </div>
    )
}