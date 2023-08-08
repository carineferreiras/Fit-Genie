Rails.application.routes.draw do
  # Users routes
  get '/me', to: 'main#index'
  get '/users', to: 'users#show'
  get '/users/:id', to: 'users#show'
  post '/users', to: 'users#create'
  patch '/users/:id', to: 'users#update'

  post '/schedule-workout/:id', to: 'schedules#add_schedule'
  delete '/schedule-workout/:id', to: 'schedules#remove_schedule'

  get '/exercises-list', to: 'exercises#get_all_exercises'
  post '/new-exercise', to: 'exercises#create_new_exercise'
  delete '/remove-exercise/:id', to: 'exercises#remove_exercise'

  # Passwords routes
  get '/passwords/edit', to: 'passwords#edit'
  patch '/passwords', to: 'passwords#update'

  # Sessions routes
  post '/login', to: 'sessions#create'
  delete '/sessions', to: 'sessions#destroy'

 # Workouts routes
  resources :users, only: [] do
    resources :workouts, only: [:index, :create]
  end

  resources :workouts

  resources :workouts do
    resources :exercises
  end
end
