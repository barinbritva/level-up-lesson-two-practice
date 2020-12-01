isDevelopment = process.env.NODE_ENV === 'development'

module.exports = {
    mode: process.env.NODE_ENV,
    entry: './src/main.ts',
    output: {
      path: __dirname + '/public/js',
      filename: '[name].js'
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
            //   здесь можно переопределить настройки tsconfig.json
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
    devtool: isDevelopment ? 'source-map' : false,
    watch: isDevelopment
  }
  