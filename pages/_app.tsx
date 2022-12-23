import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import Head from "next/head";
import "@fortawesome/fontawesome-svg-core/styles.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Head>
        <title>jw_portfolio</title>
        <link rel="icon" type="image/x-icon" href="img/portfolio/icon.PNG" />
      </Head>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
