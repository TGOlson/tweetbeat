module NewClient
  def self.connect(response)
    response.headers['Content-Type'] = 'text/event-stream'
    redis = Redis.new

    begin
      redis.subscribe('tweet') do |on|
        on.message do |event, data|
          data = JSON.parse(data)
          response.stream.write("event: #{data['index']}\n")
          response.stream.write("data: #{data.to_json}\n\n")
        end
      end

    rescue IOError
    ensure
      redis.quit
      response.stream.close
    end

  end
end
