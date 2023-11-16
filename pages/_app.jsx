import '@styles/globals.css';
import 'leaflet/dist/leaflet.css';
import '@mantine/core/styles.css';
import { Libre_Franklin } from 'next/font/google';

import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { NextUIProvider } from '@nextui-org/react';
import { MantineProvider, createTheme } from '@mantine/core';
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { pageview } from '@lib/gtag';

const theme = createTheme({
  colors: {
    dark: [
      '#FAFAFA',
      '#F4F4F5',
      '#E4E4E7',
      '#D4D4D8',
      '#A1A1AA',
      '#71717A',
      '#52525B',
      '#303030',
      '#27272A',
      '#18181B',
    ],
  },
});

const libreFranklin = Libre_Franklin({ subsets: ['latin'], display: 'swap' });

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      pageview(url, document.title);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  return (
    <React.StrictMode>
      <NextUIProvider navigate={router.push}>
        <MantineProvider theme={theme} defaultColorScheme="dark" withCssVariables>
          <NextThemesProvider attribute="class" defaultTheme='dark' enableSystem={false} enableColorScheme={false}>
            <main className={libreFranklin.className}>
              <Component {...pageProps} />
            </main>
          </NextThemesProvider>
        </MantineProvider>
      </NextUIProvider>
    </React.StrictMode>
  );
}
