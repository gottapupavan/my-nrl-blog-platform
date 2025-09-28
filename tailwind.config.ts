// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  // This tells Tailwind to scan ALL your .tsx files in the src/ folder
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}', 
  ],
  theme: {
    extend: {
      // You can add creativity here later
    },
  },
  plugins: [
    // This activates the plugin you installed for styling blog content
    require('@tailwindcss/typography'),
  ],
};

export default config;