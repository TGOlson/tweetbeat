require 'formater/sse'

class TweetsController < ApplicationController
  include ActionController::Live

  def index
  end

  def stream
    # SSE expects the `text/event-stream` content type
    response.headers['Content-Type'] = 'text/event-stream'

    sse = Formater::SSE.new(response.stream)

    client = TwitterClient.new.client

    begin
      topics = ["coffee", "tea"]
      # topics = ["dbcsleeps"]
      client.filter(:track => topics.join(",")) do |tweet|
        tweet_content = 'coffee' if tweet.text.downcase.match('coffee')
        tweet_content = 'tea' if tweet.text.downcase.match('tea')
        # tweet_content = 'dbcsleeps' if tweet.text.downcase.match('dbcsleeps')
        sse.write({ :content => tweet_content }, :event => 'tweet')
      end

    rescue IOError
      # When the client disconnects, we'll get an IOError on write
    ensure
      sse.close
    end
  end
end