import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'blue-950': '#000510',
        'cyan': {
          '50': '#e0f7ff',
          '100': '#b3edff',
          '200': '#80e3ff',
          '300': '#4dd9ff',
          '400': '#26cfff',
          '500': '#00d4ff',
          '600': '#00b8d4',
          '700': '#0099cc',
          '800': '#006b99',
          '900': '#004d66',
        },
      },
      fontFamily: {
        mono: [
          'Courier New',
          'monospace',
        ],
      },
      boxShadow: {
        'glow': '0 0 15px #00d4ff',
        'glow-lg': '0 0 30px #00d4ff',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'scanlines': 'scanlines 3s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
