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
    contract_start_date { Faker::Date.backward(days: 30) }
    contract_end_date { Faker::Date.forward(days: 30) }
  end
end
