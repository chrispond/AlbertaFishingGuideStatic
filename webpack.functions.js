module.exports = {
    optimization: { minimize: false },
    target: 'node',
    node: {
      __dirname: false,
    },
    module: {
      rules: [
        {
          test: /\.ejs$/i,
          use: 'raw-loader',
        }
      ],
    }
  };