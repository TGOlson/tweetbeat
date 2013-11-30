TweetBeat::Application.routes.draw do
  root to: 'tweets#index'

  get 'stream' => 'tweets#stream'

  get 'topics' => 'tweets#topics'
end
