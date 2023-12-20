module.exports = {
  plugins: [
    'tailwindcss',
    [
      'postcss-preset-env',
      {
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
        features: {
          'custom-media-queries': true,
          // CSS variables aren't compiled because it's not safe.
          'custom-properties': false,
          'nesting-rules': true,
          'relative-color-syntax': { preserve: true },
          'oklab-function': { preserve: true },
        },
      },
    ],
  ],
};
