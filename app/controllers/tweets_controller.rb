require 'formatter/sse'

class TweetsController < ApplicationController
  include ActionController::Live

  def index
    @topics = Topic.all
    @bindings_and_names = Synthpad.all
  end

  def stream
    response.headers['Content-Type'] = 'text/event-stream'
    sse = Formatter::SSE.new(response.stream)
    client = TwitterClient.new.client

    begin
      client.filter(:track => Topic.all.join(",")) do |tweet|
        text = tweet.text
        Topic.all.each_with_index do |topic, index|
          sse.write({ :content => text }, :event => index) if text.downcase.match(topic.downcase)
        end
      end

    rescue IOError
    ensure
      sse.close
    end
  end

  def topics
    render json: Topic.all
  end
end