import { Flex, Icon, Text } from '@chakra-ui/react'

export default function InfoCard({ icon, title, description }) {
  return (
    <Flex direction='column' align='center' cursor='default'>
      {
        <Icon as={icon} w={{ sm: 8, md: 10 }} h={{ sm: 8, md: 10 }} color='brand.400' />
      }
      <Text
        mt={4}
        fontSize={{ sm: 'sm', sm2: 'md' }}
        fontWeight={500}
        letterSpacing={1}
        color='brand.400'
      >
        {title}
      </Text>
      <Text
        fontSize={{ sm: 'xs', sm2: 'sm' }}
        color='brand.300'>
        {description}
      </Text>
    </Flex>
  )
}
