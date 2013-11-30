TenderDemo::Application.routes.draw do

  # resources :tweets, only: [:index]
  root to: 'tweets#index'

  get 'stream' => 'tweets#stream'
end
