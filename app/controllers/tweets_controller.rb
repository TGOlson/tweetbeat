require 'formater/sse'

class TweetsController < ApplicationController
  include ActionController::Live

  TOPICS = ["Coffee", "Tea", "DBCsleeps", "Canada", "USA",
            "California", "Tesla", "Moltar", "Moltar", "Moltar", "Moltar", "Moltar", "Moltar", "Moltar"]

  def index
    @topics = TOPICS
    @bindings_and_names = [['q', 'SYNTH1'], ['w', 'SYNTH2'], ['e', 'SYNTH3'], ['a', 'BASS1'], ['s', 'BASS2'],
                           ['d', 'BASS3'], ['z', 'KICK1'], ['x', 'KICK2'], ['c', 'PERC3']]
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