import '@styles/globals.css';
import 'leaflet/dist/leaflet.css';
import { Libre_Franklin } from 'next/font/google';

import React from 'react';
import { useRouter } from 'next/router';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from "next-themes";

const libreFranklin = Libre_Franklin({ subsets: ['latin'], display: 'swap' });

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <React.StrictMode>
      <NextUIProvider navigate={router.push}>
        <NextThemesProvider attribute="class" defaultTheme='dark' enableSystem={false} enableColorScheme={false}>
          <main className={libreFranklin.className}>
            <Component {...pageProps} />
          </main>
        </NextThemesProvider>
      </NextUIProvider>
    </React.StrictMode>
  );
}
