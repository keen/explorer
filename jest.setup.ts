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

const mockStorage = {};
const localStorage = {
  setItem: (key, val) => Object.assign(mockStorage, { [key]: val }),
  getItem: (key) => mockStorage[key],
  removeItem: (key) => {
    delete mockStorage[key];
  },
  clear: () => mockStorage,
  length: Object.keys(mockStorage).length,
  key: (idx) => Object.keys(mockStorage)[idx],
} as Storage;

global.localStorage = localStorage;
