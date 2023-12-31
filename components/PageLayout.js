import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

function PageLayout ({ children, title = 'Picota Calzados' }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content='Picota Calzados - Tienda de calzado femenino' />
      </Head>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </>
  )
}

export default PageLayout
