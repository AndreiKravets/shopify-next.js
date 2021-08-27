import '../styles/globals.scss'
import {useState, useEffect} from 'react'
import Link from "next/link"
import {Button, Container, Grid, Header, Image, Segment, Menu, Sidebar, Visibility} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import '../styles/bootstrap.css'
import Head from "next/head";

const Navbar = () => {
    const [fixed, setFixed] = useState(false);
    return (
        <Visibility
            once={false}
            onBottomPassed={() => setFixed(true)}
            onBottomPassedReversed={() => setFixed(false)}
        >
            <Segment
                inverted
                textAlign="center"
                style={{minHeight: 50, padding: '1em 2em'}}
            >
                <Container className='menu_container'>
                    <Link href="/">Home</Link>
                    <Link href="/about">About Us</Link>
                    <Link href="/products">Products</Link>
                    <Link href="/cart">Cart</Link>
                </Container>
            </Segment>
        </Visibility>
    )
}

function MyApp({Component, pageProps}) {

    return (
        <>
            <Head>
                <title>Create Next App</title>
            </Head>
            <Navbar/>
            <Component {...pageProps} />
        </>
    )
}

export default MyApp
