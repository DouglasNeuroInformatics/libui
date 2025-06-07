import React, { Fragment, useEffect } from 'react';

import { LanguagesIcon, MoonIcon, SunIcon } from 'lucide-react';
import { IconButton } from 'storybook/internal/components';
import { addons, types } from 'storybook/manager-api';
import { match } from 'ts-pattern';

import { useTheme } from '../src/hooks/useTheme';
import { useTranslation } from '../src/hooks/useTranslation';
import theme from './theme';

const Toolbar = React.memo(function Toolbar() {
  const [theme, setTheme] = useTheme();
  const i18n = useTranslation();

  useEffect(() => {
    const iframe = document.getElementById('storybook-preview-iframe') as HTMLIFrameElement | null;
    iframe?.contentWindow?.document.documentElement.setAttribute('data-mode', theme);
  }, [theme]);

  return (
    <Fragment>
      <IconButton
        title="TailwindCSS Theme"
        onClick={() => {
          setTheme(theme === 'light' ? 'dark' : 'light');
        }}
      >
        {match(theme)
          .with('dark', () => <SunIcon height={14} width={14} />)
          .with('light', () => <MoonIcon height={14} width={14} />)
          .exhaustive()}
      </IconButton>
      <IconButton
        title="Language"
        onClick={() => {
          i18n.changeLanguage(i18n.resolvedLanguage === 'en' ? 'fr' : 'en');
        }}
      >
        <LanguagesIcon height={14} width={14} />
      </IconButton>
    </Fragment>
  );
});

addons.setConfig({ theme });

addons.register('docs-theme', () => {
  addons.add('docs-theme-addon', {
    match: ({ viewMode }) => !!viewMode?.match(/^(story|docs)$/),
    render: Toolbar,
    title: 'Addon to change docs story theme and language',
    type: types.TOOL
  });
});
