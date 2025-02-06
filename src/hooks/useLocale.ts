import { useIntl } from 'umi';

export const useLocale = () => {
  const intl = useIntl();

  const t = (key: string) => {
    return intl.formatMessage({
      id: key,
    });
  };

  return {
    t,
  };
};

