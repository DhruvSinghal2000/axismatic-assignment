const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    devServer: {
        static: './dist',
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: './src/index.html'
        })
      ],
      entry: './src/product-selector.tsx',
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
          },
          {
            test: /\.css$/i, 
            use: ['style-loader' , {
              loader: 'css-loader',
              options: {
                modules: {
                  namedExport: true,
                  localIdentName: '[local]'
                }
              },
            }], 
            exclude: /node_modules/,
          }
        ],
      },
      resolve: {
        extensions: [ '.tsx', '.ts', '.js', '.json', '.css'],
      },
      output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
      },
}
module.exports = (_env, argv) => {
  if (argv.mode  === 'development')
    config.devtool = 'eval-source-map'; 
  else if (argv.mode === 'production') {
    config.performance =  {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    }
  }
  return config; 
};