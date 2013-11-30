TenderDemo::Application.routes.draw do
  root to: 'tweets#index'

  get 'stream' => 'tweets#stream'
end
