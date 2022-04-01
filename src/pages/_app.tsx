import { ToastContainer } from 'react-toastify';
import { CartProvider } from '../hooks/useCart';
import GlobalStyle from '../styles/global';
import 'react-toastify/dist/ReactToastify.min.css';

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <GlobalStyle />
      <Component {...pageProps} />
      <ToastContainer />
    </CartProvider>
  )
}

export default MyApp
