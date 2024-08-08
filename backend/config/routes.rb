Rails.application.routes.draw do
  resources :company_services, only: [:index]

  get "up" => "rails/health#show", as: :rails_health_check

  # root "posts#index"
end
