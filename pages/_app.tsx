import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { lightTheme } from '../themes';
import { SWRConfig } from 'swr/_internal';
import { CartProvider, UiProvider } from '../context';
import { AuthProvider } from '../context/auth';
import {SessionProvider} from 'next-auth/react';
import {PayPalScriptProvider} from '@paypal/react-paypal-js';
import { currency } from '../utils';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
       <PayPalScriptProvider options={{clientId : process.env.NEXT_PUBLIC_PAYPAL_CLIENT || ''}}>

          <SWRConfig value={{fetcher: (resource, init) =>fetch(resource,init).then(res => res.json())}}>
              <AuthProvider isLoggedIn={false}>

                <CartProvider cart={[]} numberOfItems={0} subTotal={0} tax={0} total={0} isLoaded={false}>

                <UiProvider isMenuOpen={false}>
                

                    <ThemeProvider theme={ lightTheme}>
                      <CssBaseline />
                      <Component {...pageProps} />
                    </ThemeProvider>
                
                </UiProvider>
              </CartProvider>
              </AuthProvider>
          </SWRConfig>
       </PayPalScriptProvider>
    </SessionProvider>
  )
}

export default MyApp
