require 'formatter/sse'

module Stream
  def self.start(client, response)

    response.headers['Content-Type'] = 'text/event-stream'
    sse = Formatter::SSE.new(response.stream)


    base_uri = 'https://tweetbeatfb.firebaseio.com/'
    secret_key = ENV['FIREBASE_SECRET']

    firebase = Firebase.new(base_uri, secret_key)
    count = 0

    begin
      client.filter(:track => Topic.all.join(",")) do |tweet|
        text = tweet.text
        Topic.all.each_with_index do |topic, index|
          if text.downcase.match(topic.downcase)
            firebase.push('Tweets', { topic: topic, text: text, index: index })
            count +=1
          end
          if count == 10
            firebase.delete('Tweets')
            count = 0
          end
        end
      end

    rescue IOError
    ensure
      sse.close
    end

  end
end
