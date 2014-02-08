require 'formatter/sse'

module Stream
  def self.start(client, response)

    response.headers['Content-Type'] = 'text/event-stream'
    sse = Formatter::SSE.new(response.stream)

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
