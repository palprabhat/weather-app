import "../styles/tailwind.scss";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Weather App</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
