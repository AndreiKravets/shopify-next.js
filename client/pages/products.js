import Head from 'next/head'
import {Button, Container, Card, Image, CardContent} from 'semantic-ui-react'
import Link from "next/link"
import {client} from "../utils/shopify"


export default function products({products}) {
    let products_l = products
    let products_length = products_l.length
    console.log(products_length)

    return (
        <div className='container'>
            <Head>
                <title>Create Next App</title>
            </Head>
            <div className="container products">
                <h1>Products</h1>
                <div className="row">
                    {products.map((product, index) => {
                        return (
                            <div className="col-md-4 product" key={index}>

                                <Link href={`/products/${product.id}`}>
                                    <div>
                                        <Card>
                                            {product.images.map(iage => {
                                                return (
                                                    <Image src={iage.src}/>
                                                )
                                            })}
                                            <CardContent>
                                                <p>{product.title}</p>
                                                <p>{product.description}</p>
                                                <Button color='purple'>Read more</Button>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>

        </div>
    )
}


export async function getServerSideProps() {
    const products = await client.product.fetchAll(9)
    return {props: {products: JSON.parse(JSON.stringify(products))}}
}
