import '@styles/globals.css';
import 'leaflet/dist/leaflet.css';
import { Libre_Franklin } from 'next/font/google';

import React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from "next-themes";

const libreFranklin = Libre_Franklin({ subsets: ['latin'] });

export default function App({ Component, pageProps }) {
  return (
    <React.StrictMode>
      <NextUIProvider>
        <NextThemesProvider attribute="class" defaultTheme='dark' enableSystem={false} enableColorScheme={false}>
          <main className={libreFranklin.className}>
            <Component {...pageProps} />
          </main>
        </NextThemesProvider>
      </NextUIProvider>
    </React.StrictMode>
  );
}
