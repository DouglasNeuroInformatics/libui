import React, { Fragment, useEffect } from 'react';

import { MoonIcon, SunIcon } from 'lucide-react';
import { IconButton } from 'storybook/internal/components';
import { addons, types } from 'storybook/manager-api';
import { match } from 'ts-pattern';

import { useTheme } from '../src/hooks/index.ts';
import theme from './theme.ts';

const Toolbar = React.memo(function Toolbar() {
  const [theme, setTheme] = useTheme();

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
