/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';


const MyApp = function app ({ Component, pageProps }: AppProps) {

  return (
  <>
  <ToastContainer />
    <Component {...pageProps} />
  </>
  );
};
export default MyApp;
