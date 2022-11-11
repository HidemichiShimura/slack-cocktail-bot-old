const https = require("https");

require("dotenv").config();

function chatPostMessage(text) {
    const options = {
        hostname: "slack.com",
        port: 443,
        path: "/api/chat.postMessage",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": process.env.AUTH
        }
    };

    const body = JSON.stringify({
        // Set the input text here
        text: text,
        channel: process.env.CHANNEL
    });
    
    const request = https.request(options, (res) => {
        res.on("data", (chunk) => {
            console.log(JSON.parse(chunk));
        });
     });
    
    request.write(body);
    request.end();
}

module.exports = chatPostMessage;