import "../styles/tailwind.scss";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow:wght@100;200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <title>Weather App</title>

        <meta
          name="keywords"
          content="weather,weatherapp,weather-app,weather app,nextjs,tailwindcss,project,mini project,react"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
