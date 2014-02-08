# TweetBeat

A web-based synthesizer that can be played by Twitter. Uses the Twitter streaming API to scan for user selected keywords, which then corresponds to drum pads on the synthesizer. Features include an XY pad for frequency distortion and a visualizer setting.

### Features

* Rails 4 Based
* Twitter Streaming API
* Server Sent Events
* Puma Server for Mulithreading Capability
* Flat UI
* jQuery Drag and Drop
* D3 Visualizer

### To Contribute

We would love a hand fixing bugs or adding new features. To help out, simply fork this repo, make your changes, and submit a pull request.

To run locally you need to recreate the ```.env``` file on your machine. Use this format:

```
CONSUMER_KEY: "your-twitter-key"
CONSUMER_SECRET: "your-twitter-secret"
ACCESS_TOKEN: "your-twitter-token"
ACCESS_TOKEN_SECRET: "your-twitter-token-secret"
SECRET_KEY: 'your-rails-secret-keys'
```

Then run the app using Puma in the root directory.

```
puma
```

### Team
[@TGOlson](https://github.com/TGOlson)

[@DanielEarthy](https://github.com/danielearthy)

[@MarcusMalarkus](https://github.com/marcusmalarkus)

[@Techowl](https://github.com/techowl)
