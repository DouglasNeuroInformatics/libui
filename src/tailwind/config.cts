import type { Config } from 'tailwindcss';
import type { CustomThemeConfig, PluginsConfig } from 'tailwindcss/types/config';

import fs = require('node:fs');
import path = require('node:path');

import animate = require('tailwindcss-animate');
import containerQueries = require('@tailwindcss/container-queries');
import plugin = require('tailwindcss/plugin');
import _ = require('lodash-es');

const packageRoot = path.dirname(require.resolve('@douglasneuroinformatics/libui/package.json'));

const isDev = fs.existsSync(path.resolve(packageRoot, 'src'));

type ConfigOptions = {
  content?: string[];
  include?: string[];
  includeOwnContent?: boolean;
  plugins?: PluginsConfig;
  root?: string;
  extend?: {
    theme?: Partial<CustomThemeConfig> | Partial<CustomThemeConfig>[];
  };
};

const config = ({
  content = [],
  include = [],
  includeOwnContent = true,
  root = undefined,
  plugins = [],
  extend = {}
}: ConfigOptions = {}): Config => {
  if (includeOwnContent) {
    if (isDev) {
      content.push(path.resolve(packageRoot, 'src/**/*.{js,jsx,ts,tsx}'));
    } else {
      content.push(path.resolve(packageRoot, 'dist/**/*.js'));
    }
  }

  for (const id of include) {
    const baseDir = path.dirname(require.resolve(`${id}/package.json`, { paths: root ? [root] : undefined }));
    content.push(path.resolve(baseDir, 'src/**/*.{js,ts,jsx,tsx}'));
  }

  let userTheme: Partial<CustomThemeConfig>[];
  if (Array.isArray(extend.theme)) {
    userTheme = extend.theme;
  } else if (_.isPlainObject(extend.theme)) {
    userTheme = [extend.theme!];
  } else {
    userTheme = [];
  }

  return {
    content,
    darkMode: ['class', '[data-mode="dark"]'],
    plugins: [animate, containerQueries],
    theme: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          md: '2rem',
          xl: '3rem'
        }
      },
      extend: _.merge(
        {
          animation: {
            'accordion-down': 'accordion-down 0.2s ease-out',
            'accordion-up': 'accordion-up 0.2s ease-out',
            spinner: 'spinner-spin 1.7s infinite ease, round 1.7s infinite ease'
          },
          borderRadius: {
            lg: `var(--radius)`,
            md: `calc(var(--radius) - 2px)`,
            sm: 'calc(var(--radius) - 4px)'
          },
          colors: {
            accent: {
              DEFAULT: 'var(--accent)',
              foreground: 'var(--accent-foreground)'
            },
            background: 'var(--background)',
            border: 'var(--border)',
            card: {
              DEFAULT: 'var(--card)',
              foreground: 'var(--card-foreground)'
            },
            destructive: {
              DEFAULT: 'var(--destructive)',
              foreground: 'var(--destructive-foreground)'
            },
            foreground: 'var(--foreground)',
            input: 'var(--input)',
            muted: {
              DEFAULT: 'var(--muted)',
              foreground: 'var(--muted-foreground)'
            },
            popover: {
              DEFAULT: 'var(--popover)',
              foreground: 'var(--popover-foreground)'
            },
            primary: {
              DEFAULT: 'var(--primary)',
              foreground: 'var(--primary-foreground)'
            },
            ring: 'var(--ring)',
            secondary: {
              DEFAULT: 'var(--secondary)',
              foreground: 'var(--secondary-foreground)'
            }
          },
          keyframes: {
            'accordion-down': {
              from: { height: '0' },
              to: { height: 'var(--radix-accordion-content-height)' }
            },
            'accordion-up': {
              from: { height: 'var(--radix-accordion-content-height)' },
              to: { height: '0' }
            },
            round: {
              '0%': {
                transform: 'rotate(0deg)'
              },
              '100%': {
                transform: 'rotate(360deg)'
              }
            },
            'spinner-spin': {
              '0%, 5%, 95%, 100%': {
                boxShadow: `0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em`
              },
              '10%, 59%': {
                boxShadow: `0 -0.83em 0 -0.4em, -0.087em -0.825em 0 -0.42em, -0.173em -0.812em 0 -0.44em, -0.256em -0.789em 0 -0.46em, -0.297em -0.775em 0 -0.477em`
              },
              '20%': {
                boxShadow: `0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em, -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em, -0.749em -0.34em 0 -0.477em`
              },
              '38%': {
                boxShadow: `0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em, -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em, -0.82em -0.09em 0 -0.477em`
              }
            }
          },
          screens: {
            '2xl': '1400px'
          }
        },
        ...userTheme
      ) as Partial<CustomThemeConfig>
    }
  };
};

export = config;
