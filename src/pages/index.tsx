import type { NextPage } from 'next';
import Head from 'next/head';
import { Home } from '@/components/home/home';

const HomePage: NextPage = function home () {
  return (
    <>
      <Head>
        <title>{process.env.title || "WebRTC.ventures airline customer care"}</title>
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content="WebRTC.ventures airline customer care"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Home/>
    </>
  );
};

export default HomePage;
