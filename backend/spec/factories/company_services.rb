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
    name { "MyString" }
    contract_start_date { "2024-08-02 03:19:06" }
    contract_end_date { "2024-08-02 03:19:06" }
  end
end
