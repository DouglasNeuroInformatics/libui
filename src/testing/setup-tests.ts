import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

import { i18n } from '@/i18n';

import '@testing-library/jest-dom/vitest';

vi.mock('zustand');

i18n.init({ translations: {} });

// Since we're not using vitest globals, we need to explicitly call cleanup()
// for testing-library. See:
// https://testing-library.com/docs/react-testing-library/api/#cleanup
afterEach(cleanup);
