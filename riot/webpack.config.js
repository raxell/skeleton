const path = require('path')
const { registerPreprocessor } = require('@riotjs/compiler')
const sass = require('node-sass')

registerPreprocessor('css', 'sass', function(code, { options }) {
  const { file } = options

  console.log('Compile the sass code in', file)

  const {css} = sass.renderSync({
    data: code,
  })

  return {
    code: css.css.toString(),
    map: null,
  }
})

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/public/',
    filename: 'app.js',
  },
  module: {
    rules: [
      {
        test: /\.riot$/,
        exclude: /node_modules/,
        use: [{
          loader: '@riotjs/webpack-loader',
          options: {
            hot: false,
          },
        }],
      },
    ],
  },
}
