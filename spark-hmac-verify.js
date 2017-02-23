'use strict';
const   crypto = require('crypto');
exports.handler = function(event, context) {
    const webhookSecret = 'your-webhook-secret';                    // the same secret string you used while creating the webhook
    const XSparkSignature = event.headers['X-Spark-Signature'];     // HMAC received from Spark via the webhook, in the request header
    const reqBody = event.body;                                     // Request Body received from Spark via the webhook
    var msgHASH = crypto.createHmac('sha1', webhookSecret).update(reqBody).digest('hex');
    if (XSparkSignature === msgHASH) { 
        console.log("Yay! Matching HMAC found");
    } else { console.log("Ooops! HMAC values in request header and the message hash do NOT match!"); }
};
