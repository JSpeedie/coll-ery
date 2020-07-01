const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
   entry: './src/app/index.js',
   output: {
      path: path.join(__dirname, '/bundle'),
      filename: 'index_bundle.js'
   },
   devServer: {
      inline: true,
      port: 8000
   },
   module: {
      rules: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
               presets: ['@babel/react']
            }
         },
         {
            test: /\.css$/,
            use: ['style-loader', 'css-loader' ],
         }
      ]
   },
   plugins:[
      new HtmlWebpackPlugin({
         template: './src/index.html'
      })
   ]
}
