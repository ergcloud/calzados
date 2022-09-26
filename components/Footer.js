import React from 'react'
import BotonFooter from './BotonFooter'
import { Flex, Stack, Text } from '@chakra-ui/react'

const Footer = () => {
  return (
    <Flex
      as='footer'
      w='100%'
      direction='column'
      alignItems='center'
      margin='0 auto'
    >
      <Text
        mb={3}
        textTransform='uppercase'
        fontSize={{ sm: 'sm', sm2: 'md', md: 'lg' }}
        fontWeight={500}
        letterSpacing={3}
        color='brand.200'
        opacity={0.9}
      >
        Información
      </Text>
      <Stack align='center' spacing={1.5} w='90%'>
        <BotonFooter name='TÉRMINOS Y CONDICIONES' />
        <BotonFooter name='PAGOS Y ENVIOS'/>
        <BotonFooter name='CONTACTANOS' />
      </Stack>
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
