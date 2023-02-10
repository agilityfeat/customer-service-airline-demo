/* eslint-disable camelcase */
/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css';
import { Nunito_Sans } from '@next/font/google'
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';

const nunitoSans = Nunito_Sans({
  subsets: ['latin', 'cyrillic', 'latin'],
  weight: ['200', '300', '400', '600', '700', '800', '900']
})

const MyApp = function app ({ Component, pageProps }: AppProps) {

  return (
<main className={nunitoSans.className}>
  <ToastContainer />
    <Component {...pageProps} />
  </main>
  );
};
export default MyApp;
