/**
* A basic Hello World function
* @param {string} name Who you're saying hello to
* @returns {string}
*/
module.exports = (name = 'world', context, callback) => {
  var config={
      apiKey: "AIzaSyCHdEEibwMTAeE7iPxWUieLFzzrHeKdflM",
      authDomain: "hivekeeper-9bcd7.firebaseapp.com",
      databaseURL: "https://hivekeeper-9bcd7.firebaseio.com",
      projectId: "hivekeeper-9bcd7",
      storageBucket: "hivekeeper-9bcd7.appspot.com",
      messagingSenderId: "604265744884"
  };
    var firebase = require('firebase');
    firebase.initializeApp(config);
    var database = firebase.database();
    ref = database.ref('Users/');
    ref.once("value").then(function(snapshot){
        const keyword = snapshot.key;
        const diary = snapshot.child("admin/diary").val();
        var str='\{\r\n  "document":{\r\n  "type": "PLAIN_TEXT",\r\n  "language": "en",\r\n  "content": "'+ diary+'",\r\n},\r\n  "encodingType": "UTF8",\r\n}';
        var request = require("request");
        var options = { method: 'POST',
            url: 'https://language.googleapis.com/v1beta2/documents:analyzeSentiment',
            qs: { key: 'AIzaSyA7pbu664XQiw0Qk6A0-y6brpx9zhsOtSo' },
            headers:
                { 'Postman-Token': 'bfd0d221-4c51-4fc8-8409-6322a0a4be80',
                    'cache-control': 'no-cache',
                    'Content-Type': 'application/json' },
            body:   str   };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            callback(null, body);
        });
    });
};
