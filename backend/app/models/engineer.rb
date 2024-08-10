# == Schema Information
#
# Table name: engineers
#
#  id         :bigint           not null, primary key
#  name       :string
#  color      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Engineer < ApplicationRecord
  has_many :company_service_engineers, dependent: :destroy
  has_many :company_services, through: :company_service_engineers
end
