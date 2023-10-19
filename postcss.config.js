module.exports = {
  plugins: {
    "tailwindcss": {},
    "autoprefixer": {},
    ...(process.env.NODE_ENV === "production" ? { "cssnano": {} } : {}),
    "postcss-flexbugs-fixes": {},
    "postcss-preset-env": {
      autoprefixer: { grid: false },
      stage: 0,
      features: {
        clamp: false,
        "logical-properties-and-values": false,
        "media-query-ranges": {
          preserve: true,
        },
        "custom-properties": false,
      },
    },
  },
};
