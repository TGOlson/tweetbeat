module Stream
  def self.start(client, response)
    response.headers['Content-Type'] = 'text/event-stream'

    begin
      client.filter(:track => Topic.all.join(",")) do |tweet|
        text = tweet.text
        Topic.all.each_with_index do |topic, index|
          content = { index: index, topic: topic, text: text }.to_json
          $redis.publish('tweet', content) if text.downcase.match(topic.downcase)
        end
      end

    rescue IOError
    ensure
      response.stream.close
    end

  end
end
