const lib = require('lib');
const sms = lib.utils.sms['@1.0.9'];
/**
* A function take story data from firebase and analyze the sentiment score
* @param {string} name Who you're saying hello to
 * @param {string} tel The number to text message
* @returns {string}
*/
module.exports = (name = 'world', tel = '16478183959', context, callback) => {
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
    ref = database.ref('story/');
    ref.once("value").then(function(snapshot){
        const keyword = snapshot.key;
        const diary = snapshot.child("alterA/content").val();
        const diary1 = snapshot.child("alterA/score").val();
        const diary2 = snapshot.child("alterB/content").val();
        const diary3 = snapshot.child("alterC/content").val();
        const diary4 = snapshot.child("alterD/content").val();
        context = snapshot.child("correct/content").val();
        const result1 = "Thank you for playing this game, you have reached the ending with the score: "+diary1.toString()+" and there are all the endings of the story:\n Ending one: \n"+diary + "\nEnding two: \n" +diary2+"\nEnding three: \n"+diary3 +"\nEnding four: \n"+diary4;
        let result=sms({
            to:tel,
            body:result1
        },(err)=>{
            callback(null,"the score");
        });
        // var str='\{\r\n  "document":{\r\n  "type": "PLAIN_TEXT",\r\n  "language": "en",\r\n  "content": "'+diary1+'",\r\n},\r\n  "encodingType": "UTF8",\r\n}';
        // var request = require("request");
        // var options = { method: 'POST',
        //     url: 'https://language.googleapis.com/v1beta2/documents:analyzeSentiment',
        //     qs: { key: 'AIzaSyA7pbu664XQiw0Qk6A0-y6brpx9zhsOtSo' },
        //     headers:
        //         { 'Postman-Token': 'bfd0d221-4c51-4fc8-8409-6322a0a4be80',
        //             'cache-control': 'no-cache',
        //             'Content-Type': 'application/json' },
        //     body:   str   };
        // request(options, function (error, response, body) {
        //     if (error) throw new Error(error);
        //         let result =sms({
        //         to: tel,
        //         body: body
        //     },(err) => {
        //             callback(null,'the message has sent to your phone');
        //         });
        // });
    });
};
