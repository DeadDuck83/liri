var Spotify = require('node-spotify-api');
// Files needed
var keys = require("./keys.js");
// NPM's needed
// var dotenv = require('dotenv');
var request = require('request');
var Spotify = require('node-spotify-api');
var moment = require("moment");
require("dotenv").config();

var spotify = new Spotify(keys.spotify);

console.log(spotify)