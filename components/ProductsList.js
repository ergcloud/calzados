import { useState } from 'react'
import { parseCurrency } from '../utilities/parseCurrency'
import CartModal from './CartModal'

import {
  Box,
  Grid,
  GridItem,
  Text,
  Image,
  Button,
  useDisclosure
} from '@chakra-ui/react'

function ProductsList ({ products }) {
  const [productToShow, setProductToShow] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleClick = product => {
    setProductToShow(product)
    onOpen()
  }

  return (
    <>
      <Grid
        templateColumns='repeat(auto-fit, minmax(150px, 1fr))'
        gap={5}
        my={5}
        px={6}
        justifyContent='center'
      >
        {
          products.map(product => (
            <GridItem key={product.name} boxShadow='base' borderBottomRadius={3} maxH='400px'>
              <Image
                src={product.imageUrl}
                alt={product.name}
                w='100%'
                h={{ sm: '180px', sm2: '240px', md: '270px' }}
                objectFit='cover'
                borderTopRadius={3}
              />
              <Box p={1.5}>
                <Text
                  whiteSpace='pre-line'
                  textTransform='uppercase'
                  fontSize={{ sm: 'xs', sm2: 'sm', md: 'md', lg: 'lg' }}
                  fontWeight={500}
                  lineHeight={1}
                  letterSpacing={0.5}
                >
                  {`${product.category} ${product.name}`}
                </Text>
                <Text
                  mt={2}
                  fontSize={{ sm: 'sm', sm2: 'md', md: 'lg', lg: 'xl' }}
                  fontWeight={700}
                  lineHeight={1}
                  letterSpacing={0.5}
                  color='brand.400'
                >
                  {parseCurrency(product.price)}
                </Text>
                <Text
                  fontSize={{ sm: 'xs', sm2: 'sm', md: 'md', lg: 'lg' }}
                  lineHeight={1}
                  color='brand.300'
                >
                  6 cuotas de {parseCurrency(product.price / 6)}
                </Text>
                <Button
                  variant={{ sm: 'xs', sm2: 'sm', md: 'md' }}
                  w='100%'
                  mt={3}
                  onClick={() => handleClick(product)}
                >
                  Comprar
                </Button>
              </Box>
            </GridItem>
          ))
        }
        {productToShow && <CartModal product={productToShow} isOpen={isOpen} onClose={onClose} />}
      </Grid>
    </>
  )
}

export default ProductsList
