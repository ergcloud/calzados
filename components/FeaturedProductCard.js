import { useState } from 'react'
import {
  Flex,
  Button,
  Image,
  Text,
  useDisclosure
} from '@chakra-ui/react'

import { parseCurrency } from '../utilities/parseCurrency'
import CartModal from './CartModal'

function FeaturedProductCard
(product) {
  const { name, category, price, imageUrl } = product

  const [productToShow, setProductToShow] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  // const [biggerThan500px] = useMediaQuery('(min-width: 500px)')

  const handleClick = () => {
    setProductToShow(product)
    onOpen()
  }

  return (
    <>
      <Flex
        direction='column'
        minW={{ sm: '90px', md: '180px' }}
        mb={{ sm: 10, md: 5 }}
      >
        <Image
          src={imageUrl}
          alt={name}
          h={{ sm: '165px', sm2: '200px', md: '300px' }}
          objectFit='cover'
          borderRadius={3}
          boxShadow='base'
        />
        <Text
          mt={3}
          textTransform='uppercase'
          fontSize={{ sm: 'xs', sm2: 'sm', md: 'lg' }}
          fontWeight={500}
          lineHeight={1}
          letterSpacing={0.5}
          color='brand.400'
        >
          <span style={{ display: 'block' }}>{category}</span>
          {name}
        </Text>
        <Text
          mt={1}
          textTransform='uppercase'
          fontSize={{ sm: 'sm', sm2: 'md', md: 'xl' }}
          fontWeight={700}
          lineHeight={1}
          letterSpacing={0.5}
          color='brand.400'
        >
          {parseCurrency(price)}
        </Text>
        <Button
          onClick={handleClick}
          variant={{ sm: 'xs', sm2: 'sm', md: 'md' }}
        >
          Comprar
        </Button>
      </Flex>
      {productToShow && <CartModal product={productToShow} isOpen={isOpen} onClose={onClose} />}
    </>
  )
}

export default FeaturedProductCard
