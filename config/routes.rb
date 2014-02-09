TweetBeat::Application.routes.draw do
  root to: 'tweets#index'

  get 'stream' => 'tweets#stream'
  get 'new_client' => 'tweets#new_client'

  get 'topics' => 'tweets#topics'
end
