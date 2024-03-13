import { cleanup, configure } from '@testing-library/react';
import { afterEach } from 'vitest';

import '@testing-library/jest-dom/vitest';

configure({ reactStrictMode: true });

// Since we're not using vitest globals, we need to explicitly call cleanup()
// for testing-library. See:
// https://testing-library.com/docs/react-testing-library/api/#cleanup
afterEach(cleanup);
