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
class CompanyServiceEngineer < ApplicationRecord
  belongs_to :company_service
  belongs_to :engineer

  validate :limited_engineers

  private

  def limited_engineers
    if company_service.present? && company_service.company_service_engineers.count >= 3
      errors.add(:base, "Cannot assign more than 3 engineers to a company service")
    end
  end
end
