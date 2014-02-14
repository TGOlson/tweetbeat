# TweetBeat

AKA Moltar

A web-based synthesizer that can be played by Twitter. Uses the Twitter streaming API to scan for user selected keywords, which then corresponds to drum pads on the synthesizer. Features include an XY pad for frequency distortion and a visualizer setting.

[See it live.](http://tweetbeat.herokuapp.com/)

## Features

* Rails 4 Based
* Twitter Streaming API
* Redis subscriptions and publishing
* Server Sent Events
* Puma Server for Mulithreading Capability
* Flat UI
* jQuery Drag and Drop
* D3 Visualizer

## To Contribute

We would love a hand fixing bugs or adding new features. To help out, simply fork this repo, make your changes, and submit a pull request.

To run locally you need to recreate the ```.env``` file on your machine. Use this format:

```
CONSUMER_KEY: "your-twitter-key"
CONSUMER_SECRET: "your-twitter-secret"
ACCESS_TOKEN: "your-twitter-token"
ACCESS_TOKEN_SECRET: "your-twitter-token-secret"
SECRET_KEY: "your-rails-secret-key"
REDISCLOUD_URL: "redis://localhost:6379/"
```

Then run the app using Puma in the root directory.

```
puma
```

NOTE: make sure you are running a redis server:

[Quick-start](http://redis.io/topics/quickstart)

```
redis-server
```

## Known Issues

* Can't remove keywords once dropped
* Toggling back and forth to visualizer can stack the visualizer 'ripples' (need to remove event listener)
* Audio web kit does not work in Firefox (works in Chrome, maybe also Safari) - should issue a warning
* Data is pushed to the client with server sent events, which is less widely supported than websockets
* Doesn't check for SEE compadibility - should use this:

```javascript
function supportsSSE() {
  return !!window.EventSource;
}
```

## Redis

The app is currently using the 100MB (256 connection) RedisCloud plan on Heroku. This should be the only main limiting factor as to the count of simultaneousness visitors.

## Team

* Tyler Olson [@TGOlson](https://github.com/TGOlson)
* Dan Earthy [@DanielEarthy](https://github.com/danielearthy)
* Marc Cordier [@MarcusMalarkus](https://github.com/marcusmalarkus)
* Daniel Kimbel [@Techowl](https://github.com/techowl)
