module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo", "module:metro-react-native-babel-preset"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            /**
             * Regular expression is used to match all files inside `./src` directory and map each `.src/folder/[..]` to `~folder/[..]` path
             */
            "~assets": "./assets",
            "^~(.+)": "./src/\\1"
          },
          extensions: [
            ".ios.js",
            ".android.js",
            ".js",
            ".jsx",
            ".json",
            ".tsx",
            ".ts",
            ".native.js"
          ]
        }
      ],
      "react-native-reanimated/plugin",
      //"transform-inline-environment-variables",
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: true
        }
      ]
    ],
    env: {
      production: {
        plugins: ["react-native-paper/babel"]
      }
    }
  };
};
