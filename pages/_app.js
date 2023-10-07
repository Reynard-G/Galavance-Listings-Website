import '@styles/globals.css';
import 'leaflet/dist/leaflet.css';

import React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import {ThemeProvider as NextThemesProvider} from "next-themes";

export default function App({ Component, pageProps }) {
  return (
    <React.StrictMode>
      <NextUIProvider>
        <NextThemesProvider attribute="class" defaultTheme='dark' enableSystem={false} enableColorScheme={false}>
          <Component {...pageProps} />
        </NextThemesProvider>
      </NextUIProvider>
    </React.StrictMode>
  );
}
