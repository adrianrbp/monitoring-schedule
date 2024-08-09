FactoryBot.define do
  factory :company_service_engineer do
    association :company_service
    association :engineer
  end
end
