System.config({
  paths: {
    //paths serves as alias
    'npm:': ''
  },
  map: {
    app: 'app',
    '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
    '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
    '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
    '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
    '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
    '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
    '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
    '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
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
    }
  },
})