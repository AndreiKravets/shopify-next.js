import Head from 'next/head'
import {useState, useEffect} from 'react'
import {Button, Container, Image} from 'semantic-ui-react'
import Link from "next/link"
import {client} from "../utils/shopify"
import styles from '../styles/Home.module.scss'

export default function Home({products}) {
    console.log({products})
    return (
        <div className='container'>
            <div className="container products">
                
                <h1>Last Products</h1>
                <div className="row">
                    {products.map((product, index) => {
                        return (
                            <div className="col-md-4 product" key={index}>

                                <Link href={'/products/' + product.id}>
                                    <div>
                                        {product.images.map(iage => {
                                            return (
                                                <img src={iage.src} alt=""/>
                                            )
                                        })}
                                        {product.description}
                                        <p>{product.title}</p>
                                        <p>{product.description}</p>
                                        <Button color='purple'>Add to cart</Button>
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
    const products = await client.product.fetchAll(3)
    return {props: {products: JSON.parse(JSON.stringify(products))}}
}
