import '@styles/globals.css';

import React from 'react';
import { NextUIProvider } from '@nextui-org/system';

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
