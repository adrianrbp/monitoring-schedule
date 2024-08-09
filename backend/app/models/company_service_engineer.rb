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
