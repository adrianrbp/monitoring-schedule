Rails.application.routes.draw do
  resources :company_services, only: [:index], constraints: { format: 'json' } do
    resources :weeks, only: [:index]
  end

  get "up" => "rails/health#show", as: :rails_health_check

  match '*unmatched', to: 'application#render_not_found', via: :all
end
