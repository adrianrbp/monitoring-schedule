# == Schema Information
#
# Table name: company_services
#
#  id                  :bigint           not null, primary key
#  name                :string
#  contract_start_date :datetime
#  contract_end_date   :datetime
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#
FactoryBot.define do
  factory :company_service do
    name { Faker::Company.unique.name }
    contract_start_date { Faker::Date.between(from: '2024-01-01', to: '2024-12-31') }
    contract_end_date { Faker::Date.between(from: '2024-01-01', to: '2024-12-31') }
  end
end
