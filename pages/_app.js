import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { CartProvider } from '../context/CartContext'
import theme from '../theme'

export default function MyApp ({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </ChakraProvider>
  )
}
