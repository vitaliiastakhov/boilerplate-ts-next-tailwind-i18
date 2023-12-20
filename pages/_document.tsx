import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <link
          rel='preload'
          href='/fonts/font-bold.otf'
          as='font'
          crossOrigin=''
          type='font/otf'
        />
        <link
          rel='preload'
          href='/fonts/font-medium.otf'
          as='font'
          crossOrigin=''
          type='font/otf'
        />
        <link
          rel='preload'
          href='/fonts/font-normal.otf'
          as='font'
          crossOrigin=''
          type='font/otf'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
