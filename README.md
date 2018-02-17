# liri-node-app

LIRI is a Language Interpretation and Recognition Interface. Use LIRI to get my latest tweets, find out about a song, or a movie, or just choose a random action from your own random file.
## Tech used
- Node.js
- Twitter NPM Package
- Spotify NPM Package 
- Request NPM Package

## Installs

The package.json lists dependent node packages, but these are the ones to install if dont `npm install`.

## Get Started

Here's all of the commands you can use in LIRI.

### Get Tweets

Retrieves up to latest 20 of my tweets from Twitter:

`node liri.js my-tweets`

### Get Song Info

Retrieves song information for a track within the Spotify API:

`node liri.js spotify-this-song "American Girl"`

### Get Movie Info

Retrieves movie information for a movie from OMDB:

`node liri.js movie-this "Star Wars"`

### Get do-what-it-says

Gets random text inside a file and does what it says:

`node liri.js do-what-it-says`

### Logging

All of the commands are log to a `log.txt` as well
