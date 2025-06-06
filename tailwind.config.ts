import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

import { addIconSelectors } from "@iconify/tailwind";

const config: Config = {
  darkMode: ['selector'],
  content: ['./src/**/*.{astro,md,mdx,ts,tsx}'],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: [
  				'InterVariable',
  				'InterVariable override',
                    ...defaultTheme.fontFamily.sans
                ],
  			mono: [
  				'Geist Mono',
  				'Geist Mono override',
                    ...defaultTheme.fontFamily.mono
                ]
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			tertiary: {
  				DEFAULT: 'hsl(var(--tertiary))',
  				foreground: 'hsl(var(--tertiary-foreground))'
  			},
  			goodreads: {
  				DEFAULT: 'hsl(var(--goodreads))',
  				foreground: 'hsl(var(--goodreads-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			additive: {
  				DEFAULT: 'hsl(var(--additive))',
  				foreground: 'hsl(var(--additive-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: {
  				DEFAULT: 'hsl(var(--border))',
  				foreground: 'hsl(var(--border-foreground))'
  			},
  			ring: 'hsl(var(--ring))'
  		},
  		lineHeight: {
  			'extra-tight': '1.1'
  		},
  		transitionDuration: {
  			'0': '0ms',
  			'1400': '1400ms',
  			'2000': '2000ms'
  		},
  		keyframes: {
  			marquee: {
  				from: {
  					transform: 'translateX(0)'
  				},
  				to: {
  					transform: 'translateX(calc(-100% - var(--gap)))'
  				}
  			},
  			'marquee-vertical': {
  				from: {
  					transform: 'translateY(0)'
  				},
  				to: {
  					transform: 'translateY(calc(-100% - var(--gap)))'
  				}
  			}
  		},
  		animation: {
  			marquee: 'marquee var(--duration) infinite linear',
  			'marquee-vertical': 'marquee-vertical var(--duration) linear infinite'
  		}
  	}
  },
  plugins: [
    require('@tailwindcss/typography'), 
    require('tailwindcss-animate'), 
    addIconSelectors(["vscode-icons"]),
  ],
  safelist: [
    {
      pattern: /m[bt]-(0|1|2|3|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96)/,
    },
  ]
}

export default config
