import React, { useEffect, useState } from 'react';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import Product from '../Product/Product';
import Cart from './CartComponent/Cart';
import './Shop.css';




const Shop = () =>
{
    const [ products, setProducts ] = useState( [] );
    const [ cart, setCart ] = useState( [] );

    useEffect( () =>
    {
        fetch( 'products.json' )
            .then( res => res.json() )
            .then( data => setProducts( data ) )
    }, [] );



    useEffect( () =>
    {
        const storedCart = getShoppingCart();
        const savedCart = [];

        for ( const id in storedCart )
        {
            const stayCart = products.find( product => product.id === id )
            if ( stayCart )
            {
                const quantity = storedCart[ id ];
                stayCart.quantity = quantity;
                savedCart.push( stayCart );
            }
        }

        setCart( savedCart );
        
    }, [ products ] )


  


    const handleAddToCart = ( Product ) =>
    {
        let newCart = [];
        // console.log(product);
        // do not do this: cart.push(product);

        const existCart = cart.find( pro => pro.id === Product.id );

        if ( !existCart )
        {
            Product.quantity = 1;
            newCart = [ ...cart, Product ];
        }
        else
        {
            const restCart = products.filter( product => product.id !== Product.id )
            existCart.quantity = existCart.quantity + 1;
            newCart = [ ...restCart, existCart ];
        }


        // console.log(cart)
        setCart( newCart );
        addToDb( Product.id );
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map( product => <Product
                        key={ product.id }
                        product={ product }
                        handleAddToCart={ handleAddToCart }
                    ></Product> )
                }
            </div>
            <div className="cart-container">
                <Cart cart={ cart } ></Cart>
            </div>
        </div>
    );
};

export default Shop;