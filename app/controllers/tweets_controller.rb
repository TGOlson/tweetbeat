class TweetsController < ApplicationController
  include ActionController::Live

  def index
    @topics = Topic.all
    @bindings_and_names = Synthpad.all
  end

  def stream
    Stream.start(twitter_client, response) unless $streaming
    render nothing: true
  end

  def new_client
    NewClient.connect(response)
    render nothing: true
  end

  def topics
    render json: Topic.all
  end
end
