import type { ChartConfig } from './types';

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { dark: '.dark', light: '' } as const;

export const ChartStyle = ({ config, id }: { config: ChartConfig; id: string }) => {
  const colorConfig = Object.entries(config).filter(([_, config]) => config.theme ?? config.color);

  if (!colorConfig.length) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color = itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ?? itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .join('\n')}
}
`
          )
          .join('\n')
      }}
    />
  );
};
