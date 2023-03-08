import { useContext, createContext, useState, useEffect } from 'react'

const CartContext = createContext()
export const useCartContext = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  const [productsInCart, setProductsInCart] = useState()

  useEffect(() => {
    setProductsInCart(JSON.parse(window.localStorage.getItem('shopping-cart')) || [])
  }, [])

  const [size, setSize] = useState('35')
  const [amount, setAmount] = useState(1)
  const [productName, setProductName] = useState('')

  const totalAmountInCart = productsInCart?.reduce((amount, product) => amount + product.amount, 0)

  const addProductToCart = product => {
    const itemInCart = productsInCart.find(item => item.name === product.name)

    if (!itemInCart) {
      setProductsInCart(prevProducts => {
        if (product.amount > 1) {
          product.price = product.price * product.amount
        }

        const newProducts = [...prevProducts, product]
        window.localStorage.setItem('shopping-cart', JSON.stringify(newProducts))

        return newProducts
      })

      // if (product.amount > 1) {
      //   setProductsInCart([...productsInCart, { ...product, price: product.price * product.amount }])
      // } else {
      //   setProductsInCart([...productsInCart, product])
      // }
    }
  }

  const removeProductFromCart = name => {
    const itemInCart = productsInCart.find(item => item.name === name)

    if (itemInCart) {
      setProductsInCart(productsInCart.filter(item => item.name !== name))
    }
  }

  return (
    <CartContext.Provider value={{
      amount,
      productsInCart,
      size,
      totalAmountInCart,
      productName,
      setProductName,
      setAmount,
      setSize,
      addProductToCart,
      removeProductFromCart
    }}
    >
      {children}
    </CartContext.Provider>
  )
}
