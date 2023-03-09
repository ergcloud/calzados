import { useRef } from 'react'
import { useCartContext } from '../context/CartContext'

import CartItem from './CartItem'
import { parseCurrency } from '../utilities/parseCurrency'

import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerCloseButton,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Flex,
  Stack,
  Text,
  Icon
} from '@chakra-ui/react'

import { BiShoppingBag } from 'react-icons/bi'

function CartDrawer () {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  const {
    productsInCart,
    totalAmountInCart,
    removeProductFromCart
  } = useCartContext()

  const totalPrice = productsInCart?.reduce((total, cartItem) => total + (cartItem.price * cartItem.amount), 0)

  const whatsappMessage = productsInCart?.reduce((message, product) => {
    const formattedMessage = `* ${product.name} talle ${product.size} x${product.amount} - ${parseCurrency(product.price)}\n`
    return message.concat(formattedMessage)
  }, '')
    .concat(`\nTotal: ${parseCurrency(totalPrice)}`)

  return (
    <>
      <Flex
        as='button'
        onClick={onOpen}
        gap={1}
        alignItems='center'
      >
        <Icon as={BiShoppingBag} w={{ sm: 6, sm2: 7 }} h={{ sm: 6, sm2: 7 }} color='brand.400' />
        {
          totalAmountInCart > 0 &&
            <Flex
              w={5}
              borderRadius='50%'
              justifyContent='center'
              alignItems='center'
              fontSize={{ sm: 'xs', sm2: 'sm' }}
              fontWeight={500}
              bg='pink'
              color='brand.400'
            >
              {totalAmountInCart}
            </Flex>
        }
      </Flex>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Tu Carrito</DrawerHeader>
          <DrawerBody>
            <Stack spacing={4}>
              {
                totalAmountInCart > 0
                  ? productsInCart.map(product => (
                    <CartItem
                      key={product.name}
                      product={product}
                      removeProduct={removeProductFromCart}
                    />
                  ))
                  : <Text textAlign='center'>No tienes ningún producto en el carrito</Text>
              }
            </Stack>
            {
              totalAmountInCart > 0 &&
                <>
                  <Text
                    mt={5}
                    textAlign='end'
                    fontSize={{ sm: 'sm', sm2: 'md' }}
                    fontWeight={500}
                    color='brand.400'
                  >
                    Precio total: <span style={{ fontWeight: 600 }}>{parseCurrency(totalPrice)}</span>
                  </Text>
                  <a
                    target='_blank'
                    rel='noreferrer'
                    href={`https://wa.me/5491168766677?text=${encodeURIComponent(whatsappMessage)}`}
                  >
                    <Text
                      w='100%'
                      mt={2}
                      mb={4}
                      py={1}
                      bg='brand.400'
                      color='#FFF'
                      textAlign='center'
                      fontWeight={500}
                      _hover={{ bg: '#792D30' }}
                      _active={{ bg: 'brand.400' }}
                      transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
                    >
                      Completar el pedido
                    </Text>
                  </a>
                </>
              }
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default CartDrawer
