var OAuth= require('oauth').OAuth,
    settings = require('config').settings;

/** 
 * Twitter direct message a screen name. Requires that user to be following
 * donejs.  Message must be under 140 character limit.
 */
var dm = function(screen_name, message, callback) {
  var oAuth = new OAuth("http://twitter.com/oauth/request_token",
                        "http://twitter.com/oauth/access_token",
                        settings.twitter.consumerKey,
                        settings.twitter.consumerSecret,
                        "1.0A", null, "HMAC-SHA1");

  oAuth.post("http://api.twitter.com/1/direct_messages/new.json",
             settings.twitter.accessToken,
             settings.twitter.accessTokenSecret,
             {
               "screen_name": screen_name,
               "text": message
             }, 
             function(error, result) {
               console.log("twitter dm to " + screen_name + ": " + message);
               if (error) {
                 console.log(require('sys').inspect(error));
               }
               callback(error, result)
             }
            );
};
exports.dm = dm;
