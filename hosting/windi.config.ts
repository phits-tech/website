import pluginAnimations from '@windicss/plugin-animations'
import pluginIcons from '@windicss/plugin-icons'
import { defineConfig } from 'windicss/helpers'
import pluginAspectRatio from 'windicss/plugin/aspect-ratio'
import pluginForms from 'windicss/plugin/forms'
import pluginLineClamp from 'windicss/plugin/line-clamp'

export default defineConfig({
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // Generator: http://mcg.mbitson.com
        'brand-blue': {
          DEFAULT: '#72cee6',
          50: '#eef9fc',
          100: '#d5f0f8',
          200: '#b9e7f3',
          300: '#9cddee',
          400: '#87d5ea',
          500: '#72cee6',
          600: '#6ac9e3',
          700: '#5fc2df',
          800: '#55bcdb',
          900: '#42b0d5'
        },
        'brand-black': {
          DEFAULT: '#3d3033',
          50: '#e8e6e7',
          100: '#c5c1c2',
          200: '#9e9899',
          300: '#776e70',
          400: '#5a4f52',
          500: '#3d3033',
          600: '#372b2e',
          700: '#2f2427',
          800: '#271e20',
          900: '#1a1314'
        },
        'discord-blurple': { DEFAULT: '#5865F2' },
        'facebook-blue': { DEFAULT: '#1778F2' },
        'youtube-red': { DEFAULT: '#FF0000' }
      }
    }
  },
  plugins: [
    pluginAnimations,
    pluginAspectRatio,
    pluginForms,
    pluginIcons,
    pluginLineClamp
  ]
})
