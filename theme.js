import { extendTheme } from "@chakra-ui/react";

export default extendTheme({
  styles: {
    global: {
      body: {
        fontFamily: 'Poppins'
      }
    }
  },
  colors: {
    brand: {
      100: '#F1E4E3',
      200: '#B08382',
      300: '#574241',
      400: '#250309'
    }
  },
  breakpoints: {
    sm: '320px',
    sm2: '500px',
    md: '768px',
    lg: '960px',
    xl: '1200px'
  },
  components: {
    Button: {
      baseStyle: {
        mt: 2,
        borderRadius: 0,
        letterSpacing: 2,
        textTransform: 'uppercase',
        fontWeight: 500,
        bg: 'brand.400',
        color: '#FFF',
        _hover: { bg: '#792D30' },
        _active: { bg: 'brand.400' },
        transition: 'all 0.2s cubic-bezier(.08,.52,.52,1)'
      },
      sizes: {
        md: {
          p: 0
        }
      },
      variants: {
        xs: {
          fontSize: 'xs'
        },
        sm: {
          fontSize: 'sm'
        },
        md: {
          fontSize: 'lg'
        }
      }
    }
  }
})