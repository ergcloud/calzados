import { Grid } from '@chakra-ui/react'
import Product from './Product'

function ProductsList ({ products }) {
  return (
    <>
      <Grid
        templateColumns='repeat(auto-fit, minmax(150px, 230px))'
        gap={{ sm: 5, md: 8 }}
        my={5}
        px={6}
        justifyContent='center'
      >
        {
          products.map(product => (
            <Product key={product.name} product={product} />
          ))
        }
      </Grid>
    </>
  )
}

export default ProductsList
