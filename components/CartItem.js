import { Flex, Icon, Image, Box, Text } from '@chakra-ui/react'
import { BiTrash } from 'react-icons/bi'
import { parseCurrency } from '../utilities/parseCurrency'

function CartItem ({ product, removeProduct }) {
  return (
    <Flex gap={4} justifyContent='space-between' alignItems='center'>
      <Flex gap={3} alignItems='center'>
        <Image
          src={product.imageUrl}
          alt={product.name}
          w={{ sm: '90px', sm2: '100px' }}
          h={{ sm: '100px', sm2: '110px' }}
          objectFit='cover'
          borderRadius={3}
          boxShadow='base'
        />
        <Box>
          <Text fontWeight={500} color='brand.400'>
            {product.name}
          </Text>
          <Text
            fontSize={{ sm: 'sm', sm2: 'md' }}
            fontWeight={600}
            color='brand.400'
          >
            {parseCurrency(product.price)}
          </Text>
          <Text
            fontSize='sm'
            color='brand.400'
          >
            Talle: <span style={{ fontWeight: 500 }}>{product.size}</span>
          </Text>
          <Text
            fontSize='sm'
            color='brand.400'
          >
            Cantidad: <span style={{ fontWeight: 500 }}>{product.amount}</span>
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

export default CartItem
