declare type TailwindConfig = import('tailwindcss').Config & {
  content: string[];
};

declare const config: TailwindConfig;

export = config;
