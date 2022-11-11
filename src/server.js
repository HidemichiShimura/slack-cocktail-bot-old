/*
 *  thawing-mountain-25919
 *  https://thawing-mountain-25919.herokuapp.com/ | https://git.heroku.com/thawing-mountain-25919.git
 */

require("dotenv").config();

const express = require("express");
const chatPostMessage = require("./functions/chatPostMessage");
const lookupRandomCocktailName = require("./functions/lookupRandomCocktail");

const app = express();

app.use(express.json());

app.listen(process.env.PORT || 5000, () => {
    console.log("Server is runnning");
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
    // Respond to the URL verification
    res.set({
        'Content-Type': 'text/plain'
    });
    res.send(req.body.challenge);

    // Event handling: the event "app_mention"
    if (req.body.event.type === "app_mention") {
        const drinkName = lookupRandomCocktailName(); // Get a random drink name from Cocktail API returned by this function

        drinkName.then((drink) => {
            chatPostMessage(drink);
        });
    }
});