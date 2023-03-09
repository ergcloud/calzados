import {
  Box,
  Button,
  GridItem,
  Image,
  Text,
  useDisclosure
} from '@chakra-ui/react'

import { parseCurrency } from '../utilities/parseCurrency'
import CartModal from './CartModal'

function Product ({ product }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleClick = () => {
    onOpen()
  }

  return (
    <>
      <GridItem
        boxShadow='base'
        borderBottomRadius={3}
        maxW='230px'
        maxH='400px'
      >
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
      <CartModal
        product={product}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  )
}

export default Product
