import { useState } from 'react'

import { Box, Flex, Text, Icon, useMediaQuery, Grid, GridItem } from '@chakra-ui/react'
import axios from 'axios'
import Papa from 'papaparse'
import { Pagination, Navigation, Autoplay, Lazy } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'
import 'swiper/css/lazy'
// import '../swiper-styles/styles.css'

import PageLayout from '../components/PageLayout'
import FeaturedProductCard from '../components/FeaturedProductCard'
import CataloguedProductCard from '../components/CataloguedProductCard'
import InfoCard from '../components/InfoCard'

import { BsCreditCard2Front, BsChevronDown, BsChevronUp } from 'react-icons/bs'
import { GrUpdate } from 'react-icons/gr'
import { MdDeliveryDining } from 'react-icons/md'

export default function Home ({ products }) {
  const info = [
    {
      icon: BsCreditCard2Front,
      title: '12 Cuotas sin interés',
      description: 'En compras superiores a $15000'
    },
    {
      icon: GrUpdate,
      title: 'Cambios y devoluciones',
      description: 'Tenés 30 días para cambiar tu pedido'
    },
    {
      icon: MdDeliveryDining,
      title: 'Envíos gratis',
      description: 'En compras superiores a $15000'
    }
  ]

  const productosCatalogo = [
    {
      name: 'Borcegos',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
      imageUrl: products[0].imageUrl
    },
    {
      name: 'Botas',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
      imageUrl: products[1].imageUrl
    },
    {
      name: 'Botinetas',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
      imageUrl: products[2].imageUrl
    },
    {
      name: 'Texanas',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
      imageUrl: products[3].imageUrl
    }
  ]

  const [isActive, setIsActive] = useState(false)
  const [isTabletWidth] = useMediaQuery('(min-width: 768px)')
  const [isDesktopWidth] = useMediaQuery('(min-width: 960px)')

  const toggleProductsToShow = () => {
    setIsActive(current => !current)
  }

  return (
    <PageLayout>
      <Box align='center' mt={{ sm: 20, sm2: '100px', md: '140px' }} mb={3} mx={{ sm: 3, sm2: 5 }}>
        <Text
          mb={3}
          textTransform='uppercase'
          fontSize={{ sm: 'sm', sm2: 'md', md: 'lg' }}
          fontWeight={500}
          letterSpacing={3}
          color='brand.200'
          opacity={0.9}
        >
          Destacados
        </Text>
        {
          !isTabletWidth
            ? (
              <Swiper
                modules={[Pagination, Autoplay, Lazy]}
                spaceBetween={10}
                slidesPerView={3}
                slidesPerGroup={3}
                speed={1500}
                loop
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                lazy={{ loadPrevNextAmount: 3 }}
                pagination={{ clickable: true }}
              >
                {
                products.slice(0, 9).map(product => (
                  <SwiperSlide key={product.name}>
                    <FeaturedProductCard {...product} />
                  </SwiperSlide>
                ))
              }
              </Swiper>
              )
            : (
              <>
                <Grid
                  templateColumns='repeat(3, 220px)'
                  gap={5}
                  justifyContent='center'
                  alignItems='center'
                >
                  {
                  products
                    .slice(0, isActive ? 9 : 3)
                    .map(product => (
                      <GridItem key={product.name} h='auto'>
                        <FeaturedProductCard {...product} />
                      </GridItem>
                    ))
                }
                </Grid>
                <Icon
                  as={isActive ? BsChevronUp : BsChevronDown}
                  onClick={toggleProductsToShow}
                  w={10}
                  h={10}
                  color='brand.300'
                  cursor='pointer'
                />
              </>
              )
        }
      </Box>
      <Box align='center'>
        <Text
          mb={3}
          textTransform='uppercase'
          fontSize={{ sm: 'sm', sm2: 'md', md: 'lg' }}
          fontWeight={500}
          letterSpacing={3}
          color='brand.200'
          opacity={0.9}
        >
          Explora nuestro catálogo
        </Text>
        <Flex
          mx={5}
          flexWrap='wrap'
          columnGap={10}
          rowGap={8}
          justifyContent='center'
          alignItems='center'
        >
          {
            productosCatalogo.map(({ name, description, imageUrl }) => (
              <CataloguedProductCard
                key={name}
                name={name}
                description={description}
                imageUrl={imageUrl}
              />
            ))
          }
        </Flex>
      </Box>
      <Box my={8}>
        {
          isDesktopWidth
            ? (
              <Flex justifyContent='center' gap={10}>
                {
                info.map(({ icon, title, description }) => (
                  <InfoCard key={title} icon={icon} title={title} description={description} />
                ))
              }
              </Flex>
              )
            : (
              <Swiper
                modules={[Navigation]}
                slidesPerView={1}
                speed={500}
                loop
                navigation
              >
                {
                info.map(({ icon, title, description }) => (
                  <SwiperSlide key={title}>
                    <InfoCard icon={icon} title={title} description={description} />
                  </SwiperSlide>
                ))
              }
              </Swiper>
              )
        }
      </Box>
    </PageLayout>
  )
}

export async function getStaticProps () {
  try {
    const products = await axios.get(
      process.env.DB_SHEETS_URL,
      {
        responseType: 'blob'
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
