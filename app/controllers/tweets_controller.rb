class TweetsController < ApplicationController
  include ActionController::Live

  def index
    @topics = Topic.all
    @bindings_and_names = Synthpad.all
  end

  def stream
    Stream.start(twitter_client, response) unless @twitter_client
  end

  def topics
    render json: Topic.all
  end
end
