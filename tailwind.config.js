const spaceObject = {}
for (let i = 1; i < 8; i++) {
  const width = 2 ** i
  const space = width * 4
  spaceObject[space] = `${width * 16}px`
}
/** @type {import('tailwindcss').Config} */
export default {
  corePlugins: {
    preflight: false,
  },
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        13: '13px',
        14: '14px',
        15: '15px',
        16: '16px',
        18: '18px',
        20: '20px',
        24: '24px',
      },
      fontWeight: {
        400: '400',
        500: '500',
        600: '600',
      },
      spacing: {
        ...spaceObject,
        '1/10': '10%',
        '1/9': '11%',
        '1/8': '12.5%',
        '1/7': '14.285714%',
        '1/2': '50%',
      },
      colors: {
        gray: {
          90: '#222222',
          80: '#333333',
          70: '#555555',
          60: '#999999',
          50: '#c7c7c7',
          40: '#dddddd',
          30: '#eaeaea',
          20: '#f7f7f7',
        },
      },
      padding: {
        '120px': '120px',
      },
    },
  },
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
}
