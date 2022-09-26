import { useRef } from 'react'

import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Box,
  Flex,
  Stack,
  Text,
  Icon,
  Divider,
  useMediaQuery
} from '@chakra-ui/react'

import Link from 'next/link'

import { GrMenu } from 'react-icons/gr'
import { AiFillHome } from 'react-icons/ai'

const MenuDrawer = ({ products }) => {
  const [biggerThan500px] = useMediaQuery('(min-width: 500px)')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  return (
    <>
      <Flex
        as='button'
        ref={btnRef}
        onClick={onOpen}
      >
        <Icon
          as={GrMenu}
          w={6}
          h={6}
          mr={3}
          mt={`${biggerThan500px ? 0.5 : 0}`}
          color='brand.400' />
      </Flex>
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader bg='brand.200' color='brand.400'>¡Bienvenidx!</DrawerHeader>
          <DrawerBody>
            <Link href='/'>
              <a onClick={onClose}>
                <Flex alignItems='center'>
                  <Icon as={AiFillHome} w={5} h={5} mr={3} color='brand.400' />
                  <Text
                    textTransform='uppercase'
                    fontSize='xl'
                    fontWeight={500}
                    letterSpacing={1}
                    color='brand.400'
                  >
                    Inicio
                  </Text>
                </Flex>
              </a>
            </Link>
            <Divider borderColor='brand.300' my={3} />
            <Text
              textTransform='uppercase'
              fontSize='xl'
              fontWeight={500}
              letterSpacing={1}
              color='brand.400'
            >
              Productos
            </Text>
            <Stack direction='row' h='200px' mt={2}>
              <Divider orientation='vertical' borderColor='brand.300' />
              <Box>
                <Stack mt={3} pl={2} spacing={4}>
                  {
                    products.map(product => (
                      <Link
                        key={product}
                        href={`/producto/${product}`}
                      >
                        <a onClick={onClose}>
                          <Text
                            textTransform='uppercase'
                            fontSize='xl'
                            letterSpacing={1}
                            fontWeight={500}
                            color='brand.300'
                          >
                            {product}
                          </Text>
                        </a>
                      </Link>
                    ))
                  }
                </Stack>
              </Box>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default MenuDrawer
