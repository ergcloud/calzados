import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from "axios"
import Papa from "papaparse"

import {
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  Box
} from '@chakra-ui/react'

import PageLayout from '../../components/PageLayout'
import ProductsList from '../../components/ProductsList'
import { GiSettingsKnobs } from 'react-icons/gi'

export default function Productos({ products }) {
  const router = useRouter()
  const { category } = router.query
  
  const filteredProducts = products.filter(product => product.category === category.charAt(0).toUpperCase() + category.slice(1))  
  const [orderedProducts, setOrderedProducts] = useState([])

  const orderProductsByPrice = asc => {
    let arrOfOrderedProducts

    if (asc) {
      arrOfOrderedProducts = filteredProducts.sort((a, b) => a.price - b.price)
    } else {
      arrOfOrderedProducts = filteredProducts.sort((a, b) => b.price - a.price)
    }

    setOrderedProducts(arrOfOrderedProducts)
  }

  return (
    <PageLayout title={`Picota Calzados - ${category}`}>
      <Box
        mt={{ sm: 20, sm2: '100px', md: '150px' }}
        mb={10}
      >
        <Menu closeOnSelect={false}>
          <MenuButton
            ml={{ sm: 3, sm2: 5, lg: '90px', xl: '210px' }}
            fontWeight={500}
            fontSize={{ sm: 'sm', sm2: 'md', md: 'lg', lg: 'xl' }}
            textTransform='uppercase'
            letterSpacing={2}
            color='brand.400'
            bg='#FFF'
          >
            <Flex alignItems='center' gap={2}>
              <Icon as={GiSettingsKnobs} w={6} h={6} color='brand.400' />
              Filtrar
            </Flex>
          </MenuButton>
          <MenuList minWidth='240px'>
            <MenuOptionGroup defaultValue='ascss' title='Ordenar por precio' type='radio'>
              <MenuItemOption onClick={() => orderProductsByPrice(true)} value='asc'>Menor precio</MenuItemOption>
              <MenuItemOption onClick={() => orderProductsByPrice(false)} value='desc'>Mayor precio</MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </Menu>
        <ProductsList products={orderedProducts.length > 1 ? orderedProducts : filteredProducts} />
      </Box >
    </PageLayout>
  )
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { category: 'borcegos' } },
      { params: { category: 'botas' } },
      { params: { category: 'botinetas' } },
      { params: { category: 'texanas' } }
    ],
    fallback: false
  }
}

export async function getStaticProps() {
  try {
    const products = await axios.get(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vSwaMFf-UiIC3Rq0vdEDXikinhPA-jJHAGfD8sCYk5iHHdp4Y37oUAIMqZtifQ4m9l3Rn0cgBgYewZO/pub?output=csv",
      {
        responseType: "blob"
      }
    ).then(response =>
      new Promise((resolve, reject) => {
        Papa.parse(response.data, {
          header: true,
          complete: results => resolve(results.data),
          error: error => reject(error.message)
        })
      })
    )

    return {
      props: {
        products
      },
      revalidate: 10
    }
  } catch (error) {
    console.error(error)
  }
}