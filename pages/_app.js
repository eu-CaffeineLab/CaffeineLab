import React from 'react';
import { LanguageProvider } from '../context/LanguageContext';
import { CartProvider } from '../context/CartContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <LanguageProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </LanguageProvider>
  );
}

export default MyApp;
