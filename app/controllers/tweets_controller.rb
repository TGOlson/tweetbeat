require 'formater/sse'

class TweetsController < ApplicationController
  include ActionController::Live

  TOPICS = ["coffee", "tea", "dbcsleeps", "Canada", "USA",
            "California", "Tesla", "Moltar"]

  def index
    @topics = TOPICS
  end

  def stream
    # SSE expects the `text/event-stream` content type
    response.headers['Content-Type'] = 'text/event-stream'

    sse = Formatter::SSE.new(response.stream)

    client = TwitterClient.new.client

    begin
      client.filter(:track => TOPICS.join(",")) do |tweet|
        text = tweet.text
        TOPICS.each_with_index do |topic, index|
          sse.write({ :content => text }, :event => index) if text.downcase.match(topic.downcase)
        end
      end

    rescue IOError
      # When the client disconnects, we'll get an IOError on write
    ensure
      sse.close
    end
  end

  def topics
    render json: TOPICS
  end
end