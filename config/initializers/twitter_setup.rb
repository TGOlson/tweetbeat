class TwitterClient
  attr_reader :client
  def initialize
    @client = Twitter::Streaming::Client.new do |config|
      config.consumer_key        = ENV["CONSUMER_KEY"]
      config.consumer_secret     = ENV["CONSUMER_SECRET"]
      config.access_token        = ENV["ACCESS_TOKEN"]
      config.access_token_secret = ENV["ACCESS_TOKEN_SECRET"]
    end
  end
end

$twitter_client = TwitterClient.new.client
