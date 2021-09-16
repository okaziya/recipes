import '../styles/globals.sass'
import type {AppProps} from 'next/app'
import Layout from '../components/layout'
import {SessionProvider} from "../contexts/session"

function MyApp({Component, pageProps}: AppProps) {
    return (
        <SessionProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </SessionProvider>
    )
}

export default MyApp
