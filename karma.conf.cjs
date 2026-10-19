// Configuración de Karma
// - Jasmine es el framework con el que se ESCRIBEN las pruebas (describe, it, expect).
// - Karma es el programa que las EJECUTA dentro de Chrome.
// - Webpack + Babel traducen el JSX de React para que Chrome lo entienda.
// - karma-coverage mide qué porcentaje del código de src/ recorren las pruebas.
//
//   npm test          -> abre Chrome, muestra los resultados y vuelve a correr si cambias un archivo
//   npm run test:ci   -> corre una sola vez, sin ventana, y deja la cobertura en coverage/index.html

module.exports = function (config) {
  config.set({
    frameworks: ['jasmine', 'webpack'],

    // setupTests.js va primero; después las pruebas en el orden de la tabla (1 a 10)
    files: [
      { pattern: 'src/test/setupTests.js', watched: false },
      { pattern: 'src/test/atoms/Button.spec.js', watched: false },
      { pattern: 'src/test/molecules/ProductCard.spec.js', watched: false },
      { pattern: 'src/test/pages/Products.spec.js', watched: false },
      { pattern: 'src/test/pages/Cart.spec.js', watched: false },
      { pattern: 'src/test/pages/Login.spec.js', watched: false },
      { pattern: 'src/test/pages/Categories.spec.js', watched: false },
      { pattern: 'src/test/pages/AdminProducts.spec.js', watched: false },
      // imágenes de public/, para que las tarjetas no den error 404
      { pattern: 'public/images/*', included: false, served: true, watched: false },
    ],
    proxies: {
      '/images/': '/base/public/images/',
    },

    preprocessors: {
      'src/test/**/*.js': ['webpack'],
    },

    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      resolve: { extensions: ['.js', '.jsx'] },
      module: {
        rules: [
          {
            // el proyecto usa "type": "module": esto permite importar sin escribir .jsx
            test: /\.m?jsx?$/,
            resolve: { fullySpecified: false },
          },
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                babelrc: false,
                configFile: false,
                presets: [
                  ['@babel/preset-env', { targets: 'last 2 Chrome versions' }],
                  ['@babel/preset-react', { runtime: 'automatic' }],
                ],
                // marca el código de src/ para medir la cobertura (sin contar las pruebas)
                plugins: [['babel-plugin-istanbul', { include: ['src/**'], exclude: ['src/test/**'] }]],
              },
            },
          },
          // los .css no hacen falta en las pruebas y las imágenes se cargan como data URL
          { test: /\.css$/, type: 'asset/source' },
          { test: /\.(svg|png|webp|jpe?g)$/, type: 'asset/inline' },
        ],
      },
    },

    client: {
      jasmine: { random: false },
      clearContext: false,
    },

    reporters: ['spec', 'kjhtml', 'coverage'],
    specReporter: { suppressSkipped: true, showSpecTiming: true },
    coverageReporter: {
      dir: 'coverage',
      subdir: '.',
      reporters: [{ type: 'html' }, { type: 'text-summary' }, { type: 'json-summary' }],
    },

    browsers: ['Chrome'],
    customLaunchers: {
      ChromeSinVentana: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox'],
      },
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: false,
  });
};
