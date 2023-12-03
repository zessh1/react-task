import {useCallback, useEffect, useState} from "react";

const handlechange = (e,id,setProductNum,arr,setArr) => {
  let storage = JSON.parse(localStorage.getItem("cart"))
  if (Number(e.target.value) >= 0) {
  storage[id] = Number(e.target.value);
  setProductNum(e.target.value)}
  else {
    storage[id] = 0;
    setProductNum(0)
  }
  // უბრალოდ ცვლილების დასაჭერად
  setArr(Date)
//
  localStorage.setItem("cart",JSON.stringify(storage))

}
const removeElement = (id,setProductNum,productNum) => {
  let storage = JSON.parse(localStorage.getItem("cart"))
  if (Number(productNum) > 0) {
    storage[id] = Number(storage[id]) - 1;
    setProductNum(storage[id]);
    localStorage.setItem("cart",JSON.stringify(storage))}
}

const CartRow = ({ product,totalAmount,setTotalAmount,setArr, arr}) => {
  const [productNum, setProductNum] = useState(JSON.parse(localStorage.getItem("cart"))[product.id])
  const { id, name, price, imgUrl } = product;
  // useEffect(() => {
  //   setTotalAmount(totalAmount + Number(price) * Number(productNum))
  //   console.log("a")
  // },[productNum])

  return <tr key={`product-${id}`} >
    <td className='prod-img '><img className="resp-img" src={imgUrl} alt={name} /></td>
    <td>{name}</td>
    <td>{price} $</td>
    <td>{productNum}</td>
    <td>{price * productNum} $</td>
    <input type="number" value={productNum} onChange={(e) =>handlechange(e,id,setProductNum,arr,setArr)}/>
    <button onClick={()=>removeElement(id,setProductNum,productNum)}>Remove 1</button>
  </tr>
}

export default CartRow