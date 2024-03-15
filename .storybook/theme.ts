import { create } from '@storybook/theming/create';
import colors from 'tailwindcss/colors';
import defaultTheme from 'tailwindcss/defaultTheme';

import logo from '../src/assets/libui-logo.svg';

export default create({
  appBg: colors.slate['800'],

  appBorderColor: colors.slate['700'],
  appBorderRadius: 4,

  appContentBg: colors.slate['800'],
  appPreviewBg: colors.slate['800'],
  barBg: colors.slate['700'],
  barHoverColor: colors.sky['500'],

  barSelectedColor: colors.slate['300'],
  barTextColor: colors.slate['300'],

  base: 'dark',
  booleanBg: colors.sky['700'],
  booleanSelectedBg: colors.sky['500'],
  brandImage: logo,
  brandTarget: '_self',

  brandTitle: 'libui',
  brandUrl: 'https://github.com/DouglasNeuroInformatics/libui',
  buttonBg: colors.sky['700'],

  buttonBorder: colors.sky['500'],
  colorPrimary: colors.slate['800'],
  colorSecondary: colors.slate['400'],
  fontBase: defaultTheme.fontFamily.sans.join(','),

  fontCode: defaultTheme.fontFamily.mono.join(', '),
  gridCellSize: 5,

  inputBg: colors.slate['700'],
  inputBorder: colors.slate['600'],

  inputBorderRadius: 4,
  inputTextColor: colors.slate['100'],
  textColor: colors.slate['100'],
  textInverseColor: colors.slate['900'],

  textMutedColor: colors.slate['500']
});
