import React from 'react'
import { Flex, Text, Image } from '@chakra-ui/react'
import Link from 'next/link'

function CataloguedProductCard ({ name, description, imageUrl }) {
  return (
    <Flex direction='column' w='260px' h='400px'>
      <Link href={`/producto/${name.toLowerCase()}`}>
        <a>
          <Image
            src={imageUrl}
            alt={name}
            w='100%'
            h='290px'
            objectFit='cover'
            borderRadius={3}
            boxShadow='base'
          />
          <Text
            mt={3}
            fontSize='xl'
            letterSpacing={1}
            color='brand.400'
          >
            {name}
          </Text>
        </a>
      </Link>
      <Text
        fontSize='md'
        letterSpacing={1}
        color='brand.300'
      >
        {description}
      </Text>
    </Flex>
  )
}

export default CataloguedProductCard
