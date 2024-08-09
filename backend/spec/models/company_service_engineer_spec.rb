require 'rails_helper'

RSpec.describe CompanyServiceEngineer, type: :model do
  describe 'associations' do
    it { should belong_to(:company_service) }
    it { should belong_to(:engineer) }
  end

  describe 'validations' do
    it 'validates that no more than 3 engineers can be assigned to a company service' do
      company_service = create(:company_service)
      engineers = create_list(:engineer, 3)

      engineers.each do |engineer|
        CompanyServiceEngineer.create!(company_service: company_service, engineer: engineer)
      end

      fourth_engineer = create(:engineer)
      company_service_engineer = CompanyServiceEngineer.new(company_service: company_service, engineer: fourth_engineer)

      expect(company_service_engineer.valid?).to be_falsey
      expect(company_service_engineer.errors.full_messages).to include("Cannot assign more than 3 engineers to a company service")
    end
  end
end
