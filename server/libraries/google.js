exports.googleApi = (function() {

  // var fs = require('fs');
  // var readline = require('readline');
  // var google = require('googleapis');
  // var googleAuth = require('google-auth-library');

  // var SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
  // var TOKEN_DIR = (process.env.HOME || process.env.HOMPATH || process.env.USERPROFILE) + '/.credentials/';
  // var TOKEN_PATH = TOKEN_DIR + 'drive-nodejs-quickstart.json';
  // var googleRedirectUrl = "";
  // var oauthclient;
  // function googleApi() {
  // }

  // googleApi.prototype.invoke = function(callback) {
  //   fs.readFile('client_secret.json', function processClientSecret(err, content) {
  //     if (err) {
  //       console.log('Error loading client secret file:' + err);
  //       return;
  //     }
  //     authorize(JSON.parse(content), callback)
  //   });
  // }

  // googleApi.prototype.refresh = function(callback) {
  //   oauthclient.refreshAccessToken(function(err, tokens) {
        
  //   });
  // }

  // function authorize(credentials, callback) {
  //   var clientSecret = credentials.web.client_secret;
  //   var clientId = credentials.web.client_id;
  //   var redirectUrl = credentials.web.redirect_uris[0];
  //   var auth = new googleAuth();
  //   oauthclient = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  //   fs.readFile(TOKEN_PATH, function(err, token) {
  //     if (err) {
  //       getNewToken(oauthclient, callback);
  //     } else {
  //       oauthclient.credentials = JSON.parse(token);
  //       callback(oauthclient);
  //     }
  //   });
  // }


  // function getNewToken(oauthclient, callback) {
  //   var authUrl = oauthclient.generateAuthUrl({
  //     access_type: 'offline',
  //     scope: SCOPES
  //   });
  //   this.googleRedirectUrl = authUrl;
  //   callback(this.googleRedirectUrl);
  // // console.log('Authorize this app by visiting this url:', authUrl);
  // // var rl = readline.createInterface({
  // //     input: process.stdin,
  // //     output: process.stdout
  // // });
  // // rl.question('Enter the code from that page here:', function (code) {
  // //     rl.close();
  // //     oauthclient.getToken(code, function (err, token) {
  // //         if (err) {
  // //             console.log('Error while trying to retrieve access token', err);
  // //             return;
  // //         }
  // //         oauthclient.credentials = token;
  // //         storeToken(token);
  // //         callback(oauthclient);
  // //     });
  // // });
  // }

  // googleApi.prototype.getToken = function(code, callback) {
  //   oauthclient.getToken(code, function(err, token) {
  //     if (err) {
  //       console.log('Error while trying to retrieve access token', err);
  //       return;
  //     }
  //     oauthclient.credentials = token;
  //     storeToken(token);
  //     callback(oauthclient);
  //   });
  // }

  // function storeToken(token) {
  //   try {
  //     fs.mkdirSync(TOKEN_DIR);
  //   } catch (err) {
  //     if (err.code !== 'EEXIST') {
  //       throw err;
  //     }
  //   }
  //   fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  //   console.log('Token stored to ' + TOKEN_PATH);
  // }

  // googleApi.prototype.listFiles = function(auth) {
  //   var service = google.drive('v3');
  //   service.files.list({
  //     auth: auth,
  //     pageSize: 10,
  //     fields: "nextPageToken, files(id,name)"
  //   }, function(err, response) {
  //     if (err) {
  //       console.log('The API returned an error:' + err);
  //       return;
  //     }
  //     var files = response.files;
  //     if (files.length == 0) {
  //       console.log('No files found');
  //     } else {
  //       console.log('Files:');
  //       for (var i = 0; i < files.length; i++) {
  //         var file = files[i];
  //         console.log('%s (%s)', file.name, file.id);
  //       }
  //     }
  //   });
  // }
  // return googleApi;
}());