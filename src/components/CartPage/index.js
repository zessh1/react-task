import {useEffect, useState} from 'react';
import './cartPage.css';
import CartRow from '../CartRow';

const CartPage = () => {
    const [addedProducts, setAddedProducts] = useState({data: [], loading: true});
    const [totalAmount, setTotalAmount] = useState(0)
    const [arr, setArr] = useState(1)
    useEffect(() => {
        fetch("http://localhost:3001/products").then(res => {
            if (res.ok) return res.json();
        }).then(res => {
            const cartAssoc = JSON.parse(localStorage.getItem("cart")) || {};
            const addedItems = res.filter(product => cartAssoc[product.id]);
            setAddedProducts({data: addedItems, loading: false});
        });
    }, [])

    useEffect(() => {

        const k = addedProducts.data.map(e => e.price * JSON.parse(localStorage.getItem('cart'))[e.id]);
        let c = 0;
        k.map(e => c += e)
        console.log(arr)
        setTotalAmount(c)
    }, [JSON.parse(localStorage.getItem('cart'))], arr)

    /* რეალურ პროექტში ყველა პროდუქტს არ მოვითხოვთ სერვერიდან,
    სერვერზე POST მეთოდით უნდა გაიგზავნოს პროდუქტების id - ბის მასივი და backend-სგან ვიღებთ ამ id - ბის შესაბამის პროდუქტების სიას.
    უბრალოდ json სერვერი არ გვაძლევს ამის შესაძლებლობას
    */
    if (addedProducts.loading) return "...loading";

    if (!addedProducts.data.length && !addedProducts.loading) return "No Items added";


    return (
        <>
            <table>
                <thead>
                <tr>
                    <th></th>
                    <th>name</th>
                    <th>price</th>
                    <th>quantity</th>
                    <th>Product Total Price</th>
                    <th>Change Quantity</th>
                    <th>Remove 1 Product</th>
                </tr>
                </thead>
                <tbody>
                {
                    addedProducts.data.map(product => <CartRow product={product} totalAmount={totalAmount}
                                                               setTotalAmount={setTotalAmount} arr={arr}
                                                               setArr={setArr}/>)
                }
                </tbody>
            </table>
            <h3> TOTAL AMOUNT {totalAmount} $</h3>
        </>)
}

export default CartPage;