require 'formatter/sse'

module Stream
  def self.start(response)
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
end