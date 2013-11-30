require 'reloader/sse'

class TweetsController < ApplicationController
  include ActionController::Live

  def index
  end

  def stream
    # SSE expects the `text/event-stream` content type
    response.headers['Content-Type'] = 'text/event-stream'

    sse = Reloader::SSE.new(response.stream)

    client = Twitter::Streaming::Client.new do |config|
      config.consumer_key        = "V1BVNqAJKxrNvm6liSCww"
      config.consumer_secret     = "TeAJUyTLWKuOoXKZyveiRGtprfixXKIrlC796YP3NU"
      config.access_token        = "2191389770-gb84qbU8KyaQXLETFEEsX3nfwzNOouwOiV3oAL0"
      config.access_token_secret = "J2FYXK2ofxwAPEZztRqsWMcAXLscTRWWAQ8J1OrirHN9g"
    end


    begin
      topics = ["coffee", "tea"]
      client.filter(:track => topics.join(",")) do |tweet|
        tweet_content = 'coffee' if tweet.text.downcase.match('coffee')
        tweet_content = 'tea' if tweet.text.downcase.match('tea')
        sse.write({ :content => tweet_content }, :event => 'tweet')
      end

    rescue IOError
    #   # When the client disconnects, we'll get an IOError on write
    ensure
      sse.close
    end
  end
end