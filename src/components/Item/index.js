import { useContext } from 'react';
import CartContext from '../../contexts/cartContext';
import './item.css'

const Item = ({ itemData, quantityState }) => {
  const { quantities, setQuantities } = quantityState;
  const { setCartItems } = useContext(CartContext);

  const handleSetQuantity = (e) => {
    const { value } = e.target;
    setQuantities(prevquantities => {
      return {
        ...prevquantities,
        [itemData.id]: Number(value)
      }
    })
  }

  const handleAddToCart = () => {
    setCartItems(prevItems => {
      const newItemQuantity = prevItems[itemData.id] ? prevItems[itemData.id] + quantities[itemData.id] : quantities[itemData.id];
      const newCartItems = {
        ...prevItems,
        [itemData.id]: newItemQuantity
      }
      localStorage.setItem("cart", JSON.stringify(newCartItems));
      return newCartItems;
    })
    setQuantities(prevquantities => ({ ...prevquantities, [itemData.id]: 1 }))
  }

  return (<div className="item">
    <div className="item-image"><img src={itemData.imgUrl} className="resp-img" alt={itemData.name} /></div>
    <p><b>Name:</b>{itemData.name}</p>
    <div><b>Description:</b><p>{itemData.description}</p></div>
    <p><b>Price:</b>{itemData.price}$</p>
    <p><input onChange={handleSetQuantity} type="number" className="item-price" min={1} value={quantities[itemData.id]} /></p>
    <p><button onClick={handleAddToCart}>Add to cart</button></p>
  </div>);
}

export default Item;