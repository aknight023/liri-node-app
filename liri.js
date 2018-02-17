require("dotenv").config();
var Twitter = require('twitter');
var keys = require('./keys.js');
var request = require('request');
var fs = require('fs');
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

function movie_this (movie) {

	if(	movie === undefined) {
		movie = "Mr. Nobody";
	}

	// Then run a request to the OMDB API with the movie specified
	var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
	
	// Then create a request to the queryUrl
	request(queryUrl, function(error, response, body) {
		// If the request is successful	
		if (!error && response.statusCode === 200) {
			console.log('************movie_this***********')
    		console.log('Movie Title: ' + JSON.parse(body).Title);
    		console.log('Release Year: ' + JSON.parse(body).Year);
    		console.log('IMDB Rating: ' + JSON.parse(body).imdbRating);
    		console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
    		console.log('Country: ' + JSON.parse(body).Country);
    		console.log('Language: ' + JSON.parse(body).Language);
    		console.log('Plot: ' + JSON.parse(body).Plot);
    		console.log('Actors/Actresses: ' + JSON.parse(body).Actors);
    		console.log('************************');

			fs.appendFile('log.txt','************movie_this***********\n')
    		fs.appendFile('log.txt','Movie Title: ' + JSON.parse(body).Title+'\n');
    		fs.appendFile('log.txt','Release Year: ' + JSON.parse(body).Year+'\n');
    		fs.appendFile('log.txt','IMDB Rating: ' + JSON.parse(body).imdbRating +'\n');
    		fs.appendFile('log.txt',"Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value +'\n');
    		fs.appendFile('log.txt','Country: ' + JSON.parse(body).Country +'\n');
    		fs.appendFile('log.txt','Language: ' + JSON.parse(body).Language +'\n');
    		fs.appendFile('log.txt','Plot: ' + JSON.parse(body).Plot +'\n');
    		fs.appendFile('log.txt','Actors/Actresses: ' + JSON.parse(body).Actors +'\n');
    		fs.appendFile('log.txt','************************\n');

		} 

	});

}

function myTweets () {

	var params = {
		screen_name: 'anttest23', 
		count: 20
	};

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		
		if(!error) {

			console.log('******************* My Tweets *****************************');
			fs.appendFile('log.txt','******************* My Tweets *****************************\n');
			for (var i = 0; i < tweets.length; i++) {
			console.log('*************************************************************');
			console.log('User Name: '+ params.screen_name);			
			console.log('Tweet: ' + tweets[i].text);             
			console.log('Created: ' + tweets[i].created_at);
			console.log('*************************************************************');

			fs.appendFile('log.txt','*************************************************************\n');
			fs.appendFile('log.txt','User Name: '+ params.screen_name +'\n');			
			fs.appendFile('log.txt','Tweet: ' + tweets[i].text +'\n');             
			fs.appendFile('log.txt','Created: ' + tweets[i].created_at +'\n');
			fs.appendFile('log.txt','*************************************************************\n');
			}
		}
	});
}

function spotifyApi (song) {

	if(	song === undefined) {
		song = "The Sign";
	}

	spotify.search({ type: 'track', query: song }, function(err, data) {
		
		if (err) {
			return console.log('Error occurred: ' + err);
		}			 
			console.log("****** Spotify ********"); 	
		for (var i= 0;	i < data.tracks.items.length ; i ++) {
			
			var songData = data.tracks.items[i];	

			console.log("Artist: " + songData.artists[0].name);
			console.log("Song: " + songData.name);
			console.log("Preview URL: " + songData.preview_url);
			console.log("Album: " + songData.album.name);
			console.log("*********************");
			
			fs.appendFile('log.txt',"Artist: " + songData.artists[0].name +'\n');
			fs.appendFile('log.txt',"Song: " + songData.name +'\n');
			fs.appendFile('log.txt',"Preview URL: " + songData.preview_url +'\n');
			fs.appendFile('log.txt',"Album: " + songData.album.name +'\n');
			fs.appendFile('log.txt',"*********************" +'\n');
  		}
	});

}

function commend(argumentone, argumenttwo ) {
	
	switch(argumentone) {
		case 'my-tweets':
			myTweets();
			break;
		case 'spotify-this-song':
			spotifyApi(argumenttwo);
			break;
		case 'movie-this':
			movie_this(argumenttwo);
			break;
		case 'do-what-it-says':
			do_what_it_says();
			break;
		default:
        	console.log('Please enter in a valid commend. Example: my-tweets, spotify-this-song (with a name of song), movie-this (Name of movie) ');
        	break;
	}
}

function do_what_it_says () {
    fs.readFile('random.txt', 'utf-8', function (error, data) {
        var commands = data.split(',');

        commend(commands[0], commands[1]);
    });
}

// Pull in the input from the console command and parms
commend(process.argv[2], process.argv[3]);