import { Flex, Icon, Image, Box, Text } from '@chakra-ui/react'
import { BiTrash } from 'react-icons/bi'
import { parseCurrency } from '../utilities/parseCurrency'

const ItemCarrito = ({ product, removeProduct }) => {
  return (
    <Flex gap={4} justifyContent='space-between' alignItems='center'>
      <Flex gap={3} alignItems='center'>
        <Image
          src={product.imageUrl}
          alt={product.name}
          w='90px'
          h='100px'
          objectFit='cover'
          borderRadius={3}
          boxShadow='base'
        />
        <Box>
          <Text
            lineHeight={1.3}
            fontWeight={500}
            color='brand.400'
          >
            {product.name}
          </Text>
          <Text
            fontSize='sm'
            fontWeight={600}
            color='brand.400'
          >
            {parseCurrency(product.price)}
          </Text>
          <Text
            fontSize='sm'
            color='brand.400'
          >
            Talle: {product.size}
          </Text>
          <Text
            fontSize='sm'
            color='brand.400'
          >
            Cantidad: {product.amount}
          </Text>
        </Box>
      </Flex>
      <Icon
        as={BiTrash}
        w={7}
        h={7}
        color='brand.300'
        cursor='pointer'
        onClick={() => removeProduct(product.name)}
      />
    </Flex>
  )
}

export default ItemCarrito
