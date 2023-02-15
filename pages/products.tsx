import Head from "next/head";
import styles from "../styles/Products.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default Products

// products will be populated at build time by getStaticProps()
function Products({ products, featured_products  }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Products</title>
        <meta name="description" content="List Products" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.grid}>
          <h1 className="text-2xl md:text-5xl">Listado de Productos</h1>
          <h2 className="text-xl md:text-4xl">Productos destacados</h2>
          <Carousel className={styles.featured_products}>
            {featured_products.map((featured_product) => (
              <div className={styles.product}>
                <div className={styles.image}>
                  {!featured_product.image ? "" : <img src={" + {featured_product.image} +"} />}
                </div>
                <div className={styles.text}>
                  <h3 className="text-base">{featured_product.title}</h3>
                  <p className={styles.price}>{featured_product.price} €</p>
                </div>
              </div>
            ))}
          </Carousel>

          <h2 className="text-xl md:text-4xl">Productos</h2>
          <div className="flex flex-wrap mb-4">
            {products.map((product: any) => (
              <div className="item w-full lg:w-1/4 md:w-1/3 sm:w-1/2">
                <div className={styles.product}>
                  <div className={styles.image}>
                    {!product.image ? "" : <img src={product.image} />}
                  </div>
                  <div className={styles.text}>
                    <h3 className="text-base">{product.title}</h3>
                    <p className={styles.price}>{product.price} €</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getStaticProps() {
  const res_products = await fetch('http://localhost/habitant/back/wp-json/habitant/v1/get_products')
  const products = await res_products.json()

  const res_featured_products = await fetch('http://localhost/habitant/back/wp-json/habitant/v1/get_featured_products')
  const featured_products = await res_featured_products.json()

  return {
    props: {
      products,
      featured_products
    },
  }
}