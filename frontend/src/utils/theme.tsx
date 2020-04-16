const primaryColor = {
  '100': '#d2fbf0',
  '200': '#aff7e3',
  '300': '#8bf4d7',
  '400': '#79f2d0',
  '500': '#55efc4',
  '600': '#15e0a8',
  '700': '#12bd8d',
  '800': '#0e9972',
  '900': '#08513d',
};

const secondaryColor = {
  '100': '#f4f1fe',
  '200': '#e5defe',
  '300': '#d6cbfd',
  '400': '#c6b9fc',
  '500': '#b7a6fb',
  '600': '#a893fb',
  '700': '#8a6df9',
  '800': '#6c47f8',
  '900': '#4d22f6',
};

const warnColor = {
  '100': '#FAFAD2',
  '200': '#EEE8AA',
  '300': '#F0E68C	',
  '400': '#DAA520',
  '500': '#FFD700	',
  '600': '#FFA500	',
  '700': '#FF8C00	',
  '800': '#CD853F	',
  '900': '#8B4513	',
};

const dangerColor = {
  '100': '#fffcfc',
  '200': '#fadcd9',
  '300': '#f6bcb6',
  '400': '#f4aca5',
  '500': '#f08c82',
  '600': '#eb6c5f',
  '700': '#e74c3c',
  '800': '#e02e1c',
  '900': '#bd2717',
};

const greyColor = {
  '100': '#fafafa',
  '200': '#ebebeb',
  '300': '#b8b8b8',
  '400': '#8f8f8f',
  '500': '#666666',
  '600': '#444',
  '700': '#333',
  '800': '#1f1f1f',
  '900': '#0a0a0a',
};

const colors = {
  primary: primaryColor,
  secondary: secondaryColor,
  warn: warnColor,
  danger: dangerColor,
  grey: greyColor,
};

const typography = {
  fontSizes: [14, 15, 17, 19, 25, 32, 40],
  space: [0, 1, 2, 4, 8, 12, 16, 18, 32, 64, 82],
};

const others = {
  shadows: {
    e1: '6px 6px 16px -4px rgba(0,0,0,0.88)',
    e2: '10px 10px 15px -9px rgba(0,0,0,0.75)',
    minimal: '2px 2px 9px -2px rgba(0,0,0,0.13)',
    spread: '3px 4px 25px -4px rgba(0, 0, 0, 0.36)',
    neumorphism:
      'inset 0 0 15px rgba(55, 84, 170,0), inset 0 0 20px rgba(255, 255, 255,0), 7px 7px 15px rgba(55, 84, 170,.15), -7px -7px 20px rgba(255, 255, 255,1), inset 0px 0px 4px rgba(255, 255, 255,.2)',
    // '9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px rgba(255,255,255, 0.5)',
    insetNeo:
      'inset 3px 3px 7px rgba(146, 161, 191, 0.30), inset -3px -3px 7px #FFFFFF',
    // 'inset 3px 3px 3px rgba(0,0,0,0.2), inset -3px -4px 4px rgba(255,255,255,0.4)',
    // insetNeo:
    //   'inset 7px 7px 15px rgba(55, 84, 170,.15), inset -7px -7px 20px rgba(255, 255, 255,1), 0px 0px 4px rgba(255, 255, 255,.2)',
  },
  radii: [8, 10],
};

export const theme = {
  colors,
  ...typography,
  ...others,
};
