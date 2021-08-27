import React, {Component} from 'react';
import {client} from "../utils/shopify"
import Router, {useRouter} from 'next/router';
import {Button, Card, CardContent, Image, Input} from "semantic-ui-react";
import {useState} from "react";
import {unshiftLoader} from "next/dist/build/webpack/config/helpers";
import Head from "next/head";


export default class Post extends Component {

    state = {
        cart: [],
        cart_arr: []
    }

    componentDidMount() {

        const cart_arr = (window.localStorage, JSON.parse(window.localStorage.getItem("cart")).lineItems)
        const cart = (window.localStorage, JSON.parse(window.localStorage.getItem("cart")))

        this.setState({
            cart: cart,
            cart_arr: cart_arr
        })
    }

    del_product(e, id) {
        const storage = window.localStorage;
        const cart = (window.localStorage, JSON.parse(window.localStorage.getItem("cart")))
        cart.lineItems.map((item, key) => {
            if (item.id == id) {
                cart.lineItems.splice(key, 1)
                let cart_arr = cart.lineItems
                storage.setItem('cart', JSON.stringify(cart))
                this.setState({
                    cart: cart,
                    cart_arr: cart_arr
                })
            }
        })
    }


    render() {
        const {cart} = this.state;
        const {cart_arr} = this.state;
        console.log(cart)
        const checkout = async () => {
            Router.push(cart.webUrl)
        };


        return (
            <div className='container'>
                <Head>
                    <title>Create Next App</title>
                </Head>
                <div className="container products">
                    <h1>Cart</h1>

                    {cart_arr.map((item, key) => {
                        return (
                            <div className="row d-flex cart_row" key={key}>
                                <div className='col-3'>
                                    <h2>{item.title}</h2>
                                    <h3>{item.variant.title}</h3>
                                </div>
                                <div className='col-3'>{item.variant.price}</div>
                                <div className='col-3'>{item.quantity}</div>
                                <div className='col-2'><img src={item.variant.image.src} alt=""/></div>
                                <div className='col-1'><Button color='purple'
                                    // onClick={del_product}
                                                               onClick={(e) => {
                                                                   this.del_product(e, item.id)
                                                               }}
                                ><i className="trash alternate icon"></i></Button></div>
                            </div>
                        )
                    })}
                    <Button color='purple' onClick={checkout}>Checkout</Button>
                </div>
            </div>
        )
    }
}


export async function getServerSideProps() {
    const products = await client.product.fetchAll()
    return {props: {products: JSON.parse(JSON.stringify(products))}}
}