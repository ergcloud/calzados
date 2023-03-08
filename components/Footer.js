import React from 'react'
import { Flex, Text } from '@chakra-ui/react'

const Footer = () => {
  return (
    <Flex
      as='footer'
      w='100%'
      justify='center'
    >
      <Text
        my={6}
        textTransform='uppercase'
        fontSize={{ sm: 'xs', sm2: 'sm' }}
        fontWeight={500}
        letterSpacing={1}
        color='brand.200'
      >
        Picota Calzados&copy; 2022
      </Text>
    </Flex>
  )
}

export default Footer
