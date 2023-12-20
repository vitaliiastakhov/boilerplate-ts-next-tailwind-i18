import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const NameSpaces = [
  'common',
  'info-page',
  'zod',
] as const;

export const languages = ['ru', 'en'] as const;

export const getStaticTranslations = async ({
  requestLocale,
  namespaces,
}: {
  requestLocale?: string;
  namespaces: (typeof NameSpaces)[number][];
}) => {
  return {
    ...(await serverSideTranslations(requestLocale ?? 'en', [
      ...namespaces,
    ] as Array<string>)),
  };
};
