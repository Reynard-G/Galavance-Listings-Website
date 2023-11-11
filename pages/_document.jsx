import { Html, Head, Main, NextScript } from 'next/document';
import { ColorSchemeScript } from '@mantine/core';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />

        <meta property="og:image" content="https://imgs.milklegend.xyz/hamilton-realty-200x200.png" />
        <meta property="og:url" content="https://hfr.milklegend.xyz" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Hamilton Family Realty" />
        <meta property="og:locale" content="en_US" />
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:title" content="Hamilton Family Realty" />

        <ColorSchemeScript defaultColorScheme="dark" />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
