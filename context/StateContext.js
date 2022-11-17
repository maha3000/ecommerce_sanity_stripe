import React ,{ createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'


const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalQuantities, setTotalQuantities] = useState(0)
  const [qty, setQty] = useState(1);
 
  /***********************/
  const onAdd = (product, quantity) =>  {
    const checkedProductInCart = cartItems.find((item) => item._id === product._id)
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities +  quantity);
    if(checkedProductInCart){
      const updatedCartItems = cartItems.map((cartProduct) => {
        if(cartProduct._id === product._id){
          return{
            ...cartProduct,
            quantity: cartProduct.quantity + quantity
          }
        }
      })
      setCartItems(updatedCartItems);

    }else{
      product.quantity = quantity;
      setCartItems([...cartItems, {...product}])
    }
    toast.success(`${quantity} ${product.name} added to the cart.`)
  }

  const onRemove = (product) => {
    const newCartItems = cartItems.filter(item => product._id !== item._id)
    setCartItems([...newCartItems])
    setTotalPrice((prevTotalPrice) => prevTotalPrice - product.quantity * product.price)
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - product.quantity)
  }

  const toggoleCartItemQuantity = (id, value) => {
    let foundProduct = cartItems.find((item) => item._id === id)
    let index = cartItems.findIndex((item) => item._id === id)
    const newCartItems = cartItems.filter((item ) => id !== item._id)

    if(value === 'inc'){
      setCartItems([...newCartItems, {...foundProduct, quantity: foundProduct.quantity + 1}])
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities +1)
    } else if(value === 'dec') {
      if (foundProduct.quantity > 1){
        setCartItems([...newCartItems, {...foundProduct, quantity: foundProduct.quantity - 1}])
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1)
      }
    }
    

  } 

  const incQty = () => {
    setQty((prevQty) => prevQty+1)
  } 
  const decQty = () => {
    setQty((prevQty) => prevQty>1 ? prevQty-1 : 1)
  }
  
    
  return(
    <Context.Provider
      value={{
        qty,
        incQty,
        decQty, 
        onAdd, 
        showCart,
        setShowCart,
        totalQuantities,
        cartItems, 
        totalPrice,
        toggoleCartItemQuantity,
        onRemove,
        setCartItems, 
        setTotalPrice, 
        setTotalQuantities
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);