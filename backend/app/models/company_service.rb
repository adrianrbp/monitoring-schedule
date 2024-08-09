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
class CompanyService < ApplicationRecord
  has_many :company_service_engineers, dependent: :destroy
  has_many :engineers, through: :company_service_engineers
end
