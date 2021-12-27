import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { RecoilRoot } from "recoil";
import dynamic from "next/dynamic";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
                />
            </Head>

            <RecoilRoot>
                <Component {...pageProps} />
            </RecoilRoot>
        </>
    );
}

export default dynamic(() => Promise.resolve(MyApp), { ssr: false });
