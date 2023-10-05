import '@styles/globals.css';
import 'leaflet/dist/leaflet.css';
import '@styles/embla.css';

import React from 'react';
import { NextUIProvider } from '@nextui-org/react';

export default function App({ Component, pageProps }) {
  return (
    <React.StrictMode>
      <NextUIProvider>
        <main className="dark text-foreground bg-background">
          <Component {...pageProps} />
        </main>
      </NextUIProvider>
    </React.StrictMode>
  );
}
