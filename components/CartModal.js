import { useState } from 'react'
import { useCartContext } from '../context/CartContext'
import { parseCurrency } from '../utilities/parseCurrency'

import {
  Flex,
  Text,
  Image,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Box
} from '@chakra-ui/react'

import { ImCross } from 'react-icons/im'
import { AiOutlineShareAlt } from 'react-icons/ai'
import { BsChevronDown, BsFacebook, BsWhatsapp } from 'react-icons/bs'

const CartModal = ({ product, isOpen, onClose }) => {
  const { name, category, price, imageUrl, sizes } = product
  const [isActive, setIsActive] = useState(false)

  const {
    amount,
    size,
    setAmount,
    setSize,
    addProductToCart
  } = useCartContext()

  const handleSize = (event, size) => {
    setSize(size)
    event.currentTarget.style.backgroundColor = '#250309'
    event.currentTarget.style.color = '#F1E4E3'

    document.querySelectorAll('.boton-talle').forEach(boton => {
      if (boton.innerHTML !== `${size}`) {
        boton.style.backgroundColor = '#FFF'
        boton.style.color = '#574241'
      }
    })
  }

  // const product = products.find(item => item.name === name)
  // if (product == null) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset='slideInBottom'
      isCentered
    >
      <ModalOverlay backdropFilter='blur(2px)' />
      <ModalContent w='340px'>
        <ModalBody p={5}>
          <Flex
            as='button'
            onClick={onClose}
            w={7}
            h={7}
            borderRadius='50%'
            justifyContent='center'
            alignItems='center'
            position='absolute'
            top='-15px'
            right='-15px'
            bg='brand.400'
            boxShadow='base'
          >
            <Icon as={ImCross} w={3} h={3} color='#FFF' />
          </Flex>
          {
            product &&
            <>
              <Flex justifyContent='center' alignItems='center' gap={3}>
                <Image
                  lazy='true'
                  src={imageUrl}
                  alt={name}
                  h='200px'
                  maxW='150px'
                  objectFit='cover'
                  borderRadius={3}
                />
                <Flex direction='column' justifyContent='center' >
                  <Text fontWeight={500} fontSize='xl' color='brand.400' lineHeight={1}>
                    {`${category} ${name}`}
                  </Text>
                  <Text
                    fontSize='xl'
                    fontWeight={500}
                    letterSpacing={1}
                    color='brand.300'
                  >
                    {price}
                  </Text>
                  <Text
                    fontSize='xs'
                    fontStyle='italic'
                    color='brand.300'
                  >
                    6 cuotas de {parseCurrency(price / 6)}
                  </Text>
                  <Text
                    mt={3}
                    fontSize='xs'
                    fontWeight={500}
                    fontStyle='italic'
                    color='brand.300'
                  >
                    Selecciona tu talle:
                  </Text>
                  <Flex mt={1} gap={1} flexWrap='wrap'>
                    {
                      sizes.split(',').map(size => (
                        <Flex
                          className='boton-talle'
                          key={size}
                          as='button'
                          onClick={event => handleSize(event, size)}
                          w={5}
                          h={5}
                          border='1px solid #574241'
                          borderRadius='50%'
                          justifyContent='center'
                          alignItems='center'
                          fontSize='xs'
                          fontWeight={500}
                          bg={`${size === 35 ? 'brand.400' : '#FFF'}`}
                          color={`${size === 35 ? 'brand.100' : 'brand.300'}`}
                          transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
                        >
                          {size}
                        </Flex>
                      ))
                    }
                  </Flex>
                  <Text
                    mt={2}
                    fontSize='xs'
                    fontWeight={500}
                    fontStyle='italic'
                    color='brand.300'
                  >
                    Cantidad:
                  </Text>
                  <Menu>
                    <MenuButton
                      mt={1}
                      border='1px solid #574241'
                      fontSize='sm'
                      color='brand.300'
                    >
                      <Flex alignItems='center' justifyContent='space-between' px={2}>
                        {amount}
                        <Icon as={BsChevronDown} w={4} h={4} color='brand.400' />
                      </Flex>
                    </MenuButton>
                    <MenuList>
                      {
                        [1, 2, 3].map(item => (
                          <MenuItem
                            key={item}
                            onClick={() => setAmount(item)}
                            fontSize='sm'
                            color='brand.300'
                          >
                            {item}
                          </MenuItem>
                        ))
                      }
                    </MenuList>
                  </Menu>
                </Flex>
              </Flex>
              <Box mt={2}>
                <Flex
                  as='button'
                  onClick={() => setIsActive(false)}
                  alignItems='center'
                  gap={1}
                >
                  <Text
                    fontSize='xs'
                    fontWeight={500}
                    fontStyle='italic'
                    color='brand.300'
                  >
                    Guía de talles
                  </Text>
                  <Icon as={BsChevronDown} w={4} h={4} color='brand.300' />
                </Flex>
                {
                  isActive
                    ? <Text
                      fontSize='xs'
                      color='brand.300'
                    >
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis labore mollitia necessitatibus in minus.
                    </Text>
                    : null
                }
                <Text
                  mt={1}
                  fontSize='xs'
                  fontWeight={500}
                  fontStyle='italic'
                  color='brand.300'
                >
                  Detalles
                </Text>
                <Text
                  fontSize='xs'
                  color='brand.300'
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias debitis laboriosam architecto ratione sit odit.
                </Text>
                <Flex w='100%' h='40px' mt={3} justifyContent='space-between' alignItems='center'>
                  <Box
                    as='button'
                    onClick={() => {
                      addProductToCart({
                        name: `${category} ${name}`,
                        price: price,
                        imageUrl: imageUrl,
                        size,
                        amount
                      })
                      onClose()
                    }}
                    w='85%'
                    py={2}
                    px={2.5}
                    bg='brand.400'
                    color='#FFF'
                    fontSize='md'
                    fontWeight={500}
                    letterSpacing={2}
                    _hover={{ bg: '#792D30' }}
                    _active={{
                      bg: 'brand.400'
                    }}
                    transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
                  >
                    Agregar al carrito
                  </Box>
                  <Menu>
                    <MenuButton mt={1.5}>
                      <Icon as={AiOutlineShareAlt} w={7} h={7} color='brand.400' />
                    </MenuButton>
                    <MenuList>
                      <MenuItem
                        icon={<Icon as={BsFacebook} w={4} h={4} color='brand.400' />}
                        color='brand.400'
                        fontSize='xs'
                      >
                        Facebook
                      </MenuItem>
                      <MenuItem
                        icon={<Icon as={BsWhatsapp} w={4} h={4} color='brand.400' />}
                        color='brand.400'
                        fontSize='xs'
                      >
                        WhatsApp
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>
              </Box>
            </>
          }
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default CartModal
