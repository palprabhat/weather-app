import "../styles/tailwind.scss";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow:wght@100;200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <title>Weather App</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
