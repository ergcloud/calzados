import MenuDrawer from './MenuDrawer'
import CartDrawer from './CartDrawer'

import {
  Box,
  Flex,
  Heading,
  Text,
  HStack,
  useMediaQuery,
  StackDivider
} from '@chakra-ui/react'

import Link from 'next/link'

function Header () {
  const products = [
    'borcegos',
    'botas',
    'botinetas',
    'texanas'
  ]

  const [isTabletWidth] = useMediaQuery('(min-width: 768px)')

  return (
    <Box
      as='header'
      width='100%'
      direction='column'
      position='fixed'
      zIndex={1000}
      top={0}
      bg='#FFF'
    >
      <Text
        w='100%'
        p={1}
        align='center'
        fontSize={{ sm: 'xs', sm2: 'sm', md: 'md' }}
        fontWeight={400}
        letterSpacing={1}
        color='brand.100'
        bg='brand.400'
      >
        ENVÍO GRATIS desde $15000 + 12 cuotas
      </Text>
      <Flex px={4} py={3} justifyContent='space-between' alignItems='center'>
        <Box>
          <Flex>
            {!isTabletWidth && <MenuDrawer products={products} />}
            <Link href='/'>
              <a>
                <Heading
                  as='h1'
                  fontSize={{ sm: 'xl', sm2: '2xl' }}
                  fontFamily='Cardo'
                  textTransform='uppercase'
                  letterSpacing={1.5}
                  color='brand.400'
                >
                  Picota calzados
                </Heading>
              </a>
            </Link>
          </Flex>
          {
            isTabletWidth &&
              <HStack
                spacing={5}
                divider={<StackDivider borderColor='brand.200' />}
              >
                {
                products.map(producto =>
                  <Link
                    key={producto}
                    href={`/producto/${producto}`}
                  >
                    <a>
                      <Text
                        textTransform='capitalize'
                        fontSize='xl'
                        letterSpacing={1}
                        fontWeight={500}
                        color='brand.300'
                      >
                        {producto}
                      </Text>
                    </a>
                  </Link>
                )
              }
              </HStack>
          }
        </Box>
        <CartDrawer />
      </Flex>
    </Box>
  )
}

export default Header
