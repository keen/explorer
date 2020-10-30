import '@testing-library/jest-dom';
import fetch from 'jest-fetch-mock';

fetch.enableMocks();

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (key: string) => key,
    };
  },
}));
