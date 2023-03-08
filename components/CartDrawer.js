import { useRef } from 'react'
import { useCartContext } from '../context/CartContext'

import ItemCarrito from './ItemCarrito'
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

const CartDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  const {
    productsInCart,
    totalAmountInCart,
    removeProductFromCart
  } = useCartContext()

  const totalPrice = productsInCart?.reduce((total, cartItem) => total + (cartItem.price * cartItem.amount), 0)

  const whatsappMessage = 
    productsInCart?
      .reduce((message, product) => message.concat(`* ${product.name} talle ${product.size} x${product.amount} - ${parseCurrency(product.price)}\n`), '')
      .concat(`\nTotal: ${parseCurrency(totalPrice)}`)

  return (
    <>
      <Flex
        as='button'
        onClick={onOpen}
        gap={1}
        alignItems='center'
      >
        <Icon as={BiShoppingBag} w={6} h={6} color='brand.400' />
        {
            totalAmountInCart > 0 &&
              <Flex
                w={5}
                borderRadius='50%'
                justifyContent='center'
                alignItems='center'
                fontSize='xs'
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
                    <ItemCarrito key={product.name} product={product} removeProduct={removeProductFromCart} />
                  ))
                  : <Text textAlign='center'>No tienes ningún producto en el carrito</Text>
              }
            </Stack>
            <Text
              mt={5}
              textAlign='end'
              fontSize='sm'
              fontWeight={500}
              color='brand.400'
            >
              {
                totalAmountInCart > 0 &&
                `Precio total: ${parseCurrency(totalPrice)}`
              }
            </Text>
            {
              totalAmountInCart > 0 &&
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
                    borderRadius={3}
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
            }
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default CartDrawer
