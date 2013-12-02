TweetBeat::Application.routes.draw do
  root to: 'tweets#index'

  get 'stream' => 'tweets#stream'

  get 'topics' => 'tweets#topics'

  mount JasmineRails::Engine => "/specs" if defined?(JasmineRails)
end
