module.exports = {
  plugins: {
    "tailwindcss": {},
    "autoprefixer": {
      flexbox: "no-2009",
    },
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
    "postcss-preset-mantine": {},
    "postcss-simple-vars": {
      variables: {
        "mantine-breakpoint-xs": "36em",
        "mantine-breakpoint-sm": "48em",
        "mantine-breakpoint-md": "62em",
        "mantine-breakpoint-lg": "75em",
        "mantine-breakpoint-xl": "88em",
      },
    },
  },
};
