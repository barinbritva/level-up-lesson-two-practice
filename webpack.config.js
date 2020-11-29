module.exports = {
    mode: process.env.NODE_ENV,
    entry: './src/main.ts',
    output: {
      path: __dirname + '/public',
      filename: 'js/main.js'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'ts-loader',
            //   options:
            //     process.env.NODE_ENV === 'development'
            //       ? {
            //           compilerOptions: {
            //             allowUnreachableCode: true,
            //             allowUnusedLabels: true,
            //             noUnusedLocals: false,
            //             noUnusedParameters: false
            //           }
            //         }
            //       : {}
            }
          ]
        }
      ]
    },
    devtool: process.env.NODE_ENV === 'development' ? 'source-map' : false,
    watch: process.env.NODE_ENV === 'development'
  }
  