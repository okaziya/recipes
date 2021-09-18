import '../styles/globals.sass'
import type {AppProps} from 'next/app'
import Layout from '../components/layout'
import {SessionProvider} from "../contexts/session"
import { StoreProvider } from "../contexts/store";

function MyApp({Component, pageProps}: AppProps) {
    return (
        <StoreProvider>
            <SessionProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </SessionProvider>
        </StoreProvider>
    )
}

export default MyApp
