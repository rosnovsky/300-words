const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
  plugins: [
    !isProduction && 'react-refresh/babel',
  ].filter(Boolean),
};
