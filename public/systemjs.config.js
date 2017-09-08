System.config({
  paths: {
    //paths serves as alias
    'npm:': ''
  },
  map: {
    app: 'app',
    core: 'core',
    //other libraries
    'rxjs': 'npm:rxjs',
    'moment': 'npm:moment/moment.js',
  },
  packages: {
    app: {
      main: 'main.js',
      format: 'cjs',
      defaultExtension: 'js'
    },
    rxjs: {
      defaultExtension: 'js'
    },
    core: {
      format: 'cjs',
      defaultExtension: 'js'
    }
  },
})