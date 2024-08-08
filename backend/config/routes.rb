Rails.application.routes.draw do
  resources :company_services, only: [:index], constraints: { format: 'json' }

  get "up" => "rails/health#show", as: :rails_health_check

end
