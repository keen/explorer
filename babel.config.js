module.exports = {
  "presets": [
    ["@babel/preset-env", { "useBuiltIns": "usage", "corejs": 3 }],
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
  "plugins": [
    ["prismjs", {
      "languages": ["javascript", "css", "markup"],
      "plugins": ["line-numbers"],
      "theme": "default",
      "css": true
    }],
  ]
}
