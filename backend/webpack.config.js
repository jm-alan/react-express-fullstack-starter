const { resolve } = require('path');

module.exports = {
  entry: {
    main: resolve(__dirname, 'bin', 'www')
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'build')
  },
  target: 'node',
  externalsPresets: { node: true },
  node: {
    __dirname: false,
    __filename: false
  },
  externals: {
    express: 'commonjs express',
    sequelize: 'commonjs sequelize',
    pg: 'commonjs pg'
  }
};
