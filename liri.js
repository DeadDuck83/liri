require("dotenv").config();
var Spotify = require('node-spotify-api');
// Files needed
var keys = require("./keys.js");
// NPM's needed
// var dotenv = require('dotenv');
var request = require('request');
var fs = require("fs");
// var Spotify = require('node-spotify-api');
var moment = require("moment");

var liriCat = process.argv[2];

var liriQuery = process.argv.slice(3).join(" ");

if (liriCat === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        data = data.split(", ");
        liriCat = data[0];
        liriQuery = data[1];
        if(liriCat === "spotify-this-song"){
            spotFunk();
        }
        else if(liriCat === 'movie-this'){
            movieFunk();
        }
        else{
            console.log("Looks like you got some bad info");
        }
    });
}

else if (liriCat === "spotify-this-song") {
    // SPOTIFY API //
    //=========================================
    spotFunk();

}
else if (liriCat === "movie-this") {
    movieFunk();

}
else {
    console.log("Did you forget to put in a search term? Or maybe it's spelled wrong?")
};


function spotFunk() {
    if (!liriQuery) {
        liriQuery = "The Sign";
    }
    var spotify = new Spotify(keys.spotify);
    spotify.search({ type: 'track', query: liriQuery }, function (err, data) {
        var objSrc = data.tracks.items[0];
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(`
♫ ♫ ♫ ♫ ♫ ♫ ♫ ♫ ♫ ♫ Liri Querried ♫ ♫ ♫ ♫ ♫ ♫ ♫ ♫ ♫ ♫

Artist(s): ${objSrc.artists[0].name}
Song Name: ${objSrc.name}
Preview Song: ${objSrc.preview_url}
Album: ${objSrc.album.name}

--------------- (⌐■_■) ------------------------
`)
    });
}

function movieFunk() {
    if (!liriQuery) {
        liriQuery = "Mr. Nobody";
        var liriQueryAdd = liriQuery.replace(/ /g, "+");
        var omdbURL = "http://www.omdbapi.com/?t=" + liriQueryAdd + "&y=&plot=short&apikey=trilogy";
        request(omdbURL, function (error, response, data) {
            var movieData = JSON.parse(data);
            console.log(`
🎬 🎬 🎬 🎬 🎬 🎬 🎬 Liri Querried 🎬 🎬 🎬 🎬 🎬 🎬 🎬        
    
If you haven't watched Mr. Nobody, you should: ${movieData.Website}
It's on Netflix!!

--------------- (⌐■_■) ------------------------
    `)
        });
    }
    // OMDB API //
    //=========================================
    var liriQueryAdd = liriQuery.replace(/ /g, "+");
    var omdbURL = "http://www.omdbapi.com/?t=" + liriQueryAdd + "&y=&plot=short&apikey=trilogy";
    request(omdbURL, function (error, response, data) {
        var movieData = JSON.parse(data);

        console.log(`
🎬 🎬 🎬 🎬 🎬 🎬 🎬 Liri Querried 🎬 🎬 🎬 🎬 🎬 🎬 🎬        
    
Movie Title: ${movieData.Title}
Year Produced: ${movieData.Year}
IMDB Rating: ${movieData.imdbRating}
Rotten Tomatoes Rating: ${movieData.Ratings[1].Value}
Country Produced In: ${movieData.Country}
The Plot: ${movieData.Plot}
The Talent: ${movieData.Actors}

--------------- (⌐■_■) ------------------------
    `)
    });
}