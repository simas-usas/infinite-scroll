import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import indexeddb from 'fake-indexeddb';

globalThis.indexedDB = indexeddb;

afterEach(() => {
  cleanup();
});
