# NYT Film Review Library

<img src="https://i.imgur.com/E3TQ3fe.png" width="700">

Try it out! https://nyt-film-library.vercel.app/

## Motivation

The goal is to learn React.js by building a React-based Single-Page Application based on something that I'm passionate about - movies! The NYT Film Review API provides a library of archived film reviews since 1910s when New York Times started writing about movies. 

Technically speaking, there is no specific reason for choosing the NYT Film Review API, except for the fact that there doesn't seem to be any other movie-review-based APIs around. Let me know when the Roger Ebert website announces theirs!

The NYT API is also supplemented with the TMDB API for additional infos such as movie posters and average user scores. This provides a more user-friendly information on top of the reviews themselves. 

## User Experience

(MVP) As a user, I'd like to:

1. Search for a specific movie based on its title (Y)
2. Browse for different films through the decades (Y)
3. Add movies to favorites (Y)

Additionally, it'll be nice to have:

1. A light/dark theme option. (Y)
2. Search for a specific movie in each decade? (Y)
3. Access the iconic NYT critics' pick. (Y)
4. NYT API only shows up to 20 reviews at a time. Would be nice to access review #21 to #40, #41 to #60 .etc. (Y)
5. See images along with each review. (Y)
6. See TMDB average user scores for each movie reviewed. (Y)

## App Architecture

<img src="https://i.imgur.com/PDcDVab.png" width="700">

## Error 429 (Too Many Requests) - WIP

Per New York Times: "Is there an API call limit? Yes, there are two rate limits per API: 4,000 requests per day and 10 requests per minute. You should sleep 6 seconds between calls to avoid hitting the per minute rate limit."

## Documentation

This app uses New York Times (https://github.com/kenzonagari/NYTFilmLibrary) and TMDB API (https://developer.nytimes.com/docs/movie-reviews-api/1/overview).

Loading animation imported from react-loading (https://github.com/fakiolinho/react-loading).

TMDB user rating score UI imported from react-circular-progressbar (https://github.com/kevinsqi/react-circular-progressbar).
