module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          reduxAct: './src/config/redux/actions',
          myComponents: './src/components',
          myFunction: './src/utils/functions',
          myColors: './src/assets/theme',
        },
      },
    ],
  ],
};
