
import './Cart.css';

const Cart = ({cart} ) =>
{
   
    // console.log( quantity )
    
    let totalPrice = 0;
    let totalShipping = 0;
    let quantity = 0;
  

    for ( let product of cart )
    {
        quantity = quantity + product.quantity;
        totalPrice = totalPrice + ( product.quantity * product.price );
        totalShipping = totalShipping + ( product.quantity * product.shipping );
    }

    const totalTax = parseFloat( ( totalPrice * ( 10 / 100 ) ).toFixed( 2 ) );
    const grandTotal = totalPrice + totalShipping + totalTax;


    return (
        <div className='card'>
            <h4>Order Summary</h4>
            <p>Selected Items: { quantity }</p>
            <p>Total Price: ${totalPrice }</p>
            <p>Total Shipping: ${ totalShipping}</p>
            <p>Total Tax: ${totalTax }</p>
            <h5>Grand Total: ${ grandTotal}</h5>
        </div>
    );
};

export default Cart;