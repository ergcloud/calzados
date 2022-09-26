import { Box, Flex, Text, Icon } from '@chakra-ui/react'
import { FaGreaterThan } from 'react-icons/fa'

const BotonFooter = ({ name }) => {
  return (
    <Box
      as='button'
      w='100%'
      py={1.5}
      px={4}
      bg='brand.200'
      color='#FFF'
      fontSize='xs'
      letterSpacing={3}
      textTransform='uppercase'
      _hover={{ bg: '#792D30' }}
      _active={{
        bg: 'brand.200'
      }}
      transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
    >
      <Flex align='center' justify='space-between'>
        <Text
          fontSize={{ sm: 'xs', md: 'sm' }}
          fontWeight={500}
        >
          {name}
        </Text>
        <Icon as={FaGreaterThan} w={2} />
      </Flex>
    </Box>
  )
}

export default BotonFooter
