// Configuración de Karma.
// - Jasmine es el framework con el que se ESCRIBEN las pruebas (describe, it, expect).
// - Karma es el programa que las EJECUTA dentro de un navegador Chrome real.
// - Webpack + Babel traducen el JSX de React para que el navegador lo entienda.
// - karma-coverage mide qué porcentaje del código de /src recorren las pruebas.
//
// Comandos:
//   npm test          -> abre Chrome, muestra los resultados y se queda mirando cambios
//   npm run test:ci   -> corre una sola vez en Chrome sin ventana y genera la cobertura

export default function (config) {
  config.set({
    frameworks: ['jasmine', 'webpack'],

    // Archivos de pruebas, en el orden de la tabla de casos (prueba 1 a 10)
    files: [
      { pattern: 'tests/ProductList.spec.js', watched: false },
      { pattern: 'tests/ProductCard.spec.js', watched: false },
      { pattern: 'tests/Cart.spec.js', watched: false },
      { pattern: 'tests/Login.spec.js', watched: false },
      { pattern: 'tests/Formulario.spec.js', watched: false },
      { pattern: 'tests/Categorias.spec.js', watched: false },
      { pattern: 'tests/Checkout.spec.js', watched: false },
      // Imágenes de las camisetas (solo para que no aparezcan errores 404 al dibujar las tarjetas)
      { pattern: 'public/images/*', included: false, served: true, watched: false },
    ],
    proxies: {
      '/images/': '/base/public/images/',
    },

    preprocessors: {
      'tests/**/*.spec.js': ['webpack'],
    },

    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      resolve: { extensions: ['.js', '.jsx'] },
      module: {
        rules: [
          {
            // El proyecto usa "type": "module"; esto permite importar sin escribir la extensión (.jsx)
            test: /\.m?jsx?$/,
            resolve: { fullySpecified: false },
          },
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { targets: 'last 2 Chrome versions' }],
                  ['@babel/preset-react', { runtime: 'automatic' }],
                ],
                // Marca el código de /src para medir la cobertura (no mide las pruebas)
                plugins: [['babel-plugin-istanbul', { exclude: ['tests/**', 'node_modules/**'] }]],
              },
            },
          },
        ],
      },
    },

    client: {
      jasmine: { random: false }, // las pruebas corren siempre en el mismo orden (1 a 10)
      clearContext: false, // deja visibles los resultados en el navegador
    },

    reporters: ['spec', 'kjhtml', 'coverage'],

    specReporter: {
      suppressSkipped: true,
      showSpecTiming: true,
    },

    coverageReporter: {
      dir: 'coverage',
      subdir: '.',
      reporters: [
        { type: 'html' }, // abrir coverage/index.html en el navegador
        { type: 'text-summary' }, // resumen en la terminal
        { type: 'json-summary' },
      ],
    },

    browsers: ['Chrome'],
    customLaunchers: {
      // Chrome sin ventana, útil en servidores o para generar el reporte rápido
      ChromeHeadlessSinCaja: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox'],
      },
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: false,
    concurrency: Infinity,
  });
}
