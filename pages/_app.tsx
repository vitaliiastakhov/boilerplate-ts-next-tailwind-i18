import type { AppProps } from 'next/app';

import { appWithTranslation, useTranslation } from 'next-i18next';
import { DefaultSeo } from 'next-seo';

import '@/styles/globals.css';

import { Layout } from '@/widgets/layout';

const defaultSEODescription = {
  ru: 'Russian Seo Text',
  en: 'English Seo Text',
};

function MyApp({ Component, pageProps }: AppProps) {
  const { i18n } = useTranslation();

  return (
    <>
      <Layout>
        <DefaultSeo
          title='Boilerplate Next.js + Typescript + Tailwind'
          description={defaultSEODescription[i18n.language as 'ru' | 'en']}
        />
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default appWithTranslation(MyApp);
