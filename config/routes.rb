Ryanbeckman::Application.routes.draw do
  root to: "roots#index"
  resources :roots, only: [:index, :create]
  get "tictactoe", to: "roots#tictactoe"
  get "asteroids", to: "roots#asteroids"
end
