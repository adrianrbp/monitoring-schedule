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
    contract_start_date { Faker::Date.between(from: '2024-07-01', to: '2024-08-31').beginning_of_week }
    contract_end_date { Faker::Date.between(
      from: contract_start_date,
      to: '2024-10-31').end_of_week
    }
    contract_start_week { "#{contract_start_date.year}-#{contract_start_date.cweek}" }
    contract_end_week { "#{contract_end_date.year}-#{contract_end_date.cweek}" }
  end
end
# improve: company_service defien contract_start_week and end_week to avoid doing calculations on date level.
