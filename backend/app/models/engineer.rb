class Engineer < ApplicationRecord
  has_many :company_service_engineers, dependent: :destroy
  has_many :company_services, through: :company_service_engineers
end
