import '@testing-library/jest-dom/vitest';
import { localStorageMock } from './src/mocks/localStorage';

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});