# == Schema Information
#
# Table name: company_service_engineers
#
#  id                 :bigint           not null, primary key
#  company_service_id :bigint           not null
#  engineer_id        :bigint           not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#
FactoryBot.define do
  factory :company_service_engineer do
    company_service
    engineer
  end
end
