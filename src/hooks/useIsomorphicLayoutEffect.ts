import { useEffect, useLayoutEffect } from 'react';

import { isBrowser } from '../utils.js';

export const useIsomorphicLayoutEffect = isBrowser() ? useLayoutEffect : useEffect;
