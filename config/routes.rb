Ryanbeckman::Application.routes.draw do
  root to: "roots#index"
  resources :roots, only: [:index, :create]
end
