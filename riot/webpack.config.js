const path = require('path')
const { registerPreprocessor } = require('@riotjs/compiler')
const sass = require('node-sass')
const ts = require('typescript')

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


registerPreprocessor('javascript', 'ts', function(code, { options }) {
  const { file } = options

  const result = ts.transpileModule(code, {
    fileName: file,
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
    },
  })

  return {
    code: result.outputText,
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
