require 'formater/sse'

class TweetsController < ApplicationController
  include ActionController::Live

  TOPICS = ["Coffee", "Tea", "DBCsleeps", "Canada", "USA",
            "California", "Tesla", "Moltar", "Moltar", "Moltar", "Moltar", "Moltar", "Moltar", "Moltar"]

  def index
    @topics = TOPICS
    @key_bindings = {0 => 'q', 1 => 'w', 2 => 'e', 3 => 'a', 4 => 's', 5 => 'd', 6 => 'z',7 => 'x', 8 => 'c'}
  end

  def stream
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

    ensure
      sse.close
    end
  end

  def topics
    render json: TOPICS
  end
end