import type { HomePageProps } from '@/pages/home-page';
import type { GetStaticPropsContext, NextPage } from 'next';

import { getStaticTranslations } from '@/app/config/i18n/get-sst';
import { HomePage } from '@/pages/home-page';

const Page: NextPage<HomePageProps> = () => {
  return <HomePage />;
};

export default Page;

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => {
  return {
    props: {
      ...(await getStaticTranslations({
        requestLocale: locale,
        namespaces: ['common', 'zod'],
      })),
    },
  };
};
