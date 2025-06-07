import { formatRgb } from 'culori';
import { create } from 'storybook/theming/create';
import colors from 'tailwindcss/colors';
import defaultTheme from 'tailwindcss/defaultTheme';

import logo from '../src/assets/libui-logo.svg';

export default create({
  appBg: formatRgb(colors.slate['800']),

  appBorderColor: formatRgb(colors.slate['700']),
  appBorderRadius: 4,

  appContentBg: formatRgb(colors.slate['800']),
  appPreviewBg: formatRgb(colors.slate['800']),
  barBg: formatRgb(colors.slate['700']),
  barHoverColor: formatRgb(colors.sky['500']),

  barSelectedColor: formatRgb(colors.slate['300']),
  barTextColor: formatRgb(colors.slate['300']),

  base: 'dark',
  booleanBg: formatRgb(colors.sky['700']),
  booleanSelectedBg: formatRgb(colors.sky['500']),
  brandImage: logo,
  brandTarget: '_self',

  brandTitle: 'libui',
  brandUrl: 'https://github.com/DouglasNeuroInformatics/libui',
  buttonBg: formatRgb(colors.sky['700']),

  buttonBorder: formatRgb(colors.sky['500']),
  colorPrimary: formatRgb(colors.slate['800']),
  colorSecondary: formatRgb(colors.slate['400']),
  fontBase: defaultTheme.fontFamily.sans.join(','),

  fontCode: defaultTheme.fontFamily.mono.join(', '),
  gridCellSize: 5,

  inputBg: formatRgb(colors.slate['700']),
  inputBorder: formatRgb(colors.slate['600']),

  inputBorderRadius: 4,
  inputTextColor: formatRgb(colors.slate['100']),
  textColor: formatRgb(colors.slate['100']),
  textInverseColor: formatRgb(colors.slate['900']),

  textMutedColor: formatRgb(colors.slate['500'])
});
