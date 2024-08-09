require 'rails_helper'

RSpec.describe CompanyServiceEngineer, type: :model do
  describe 'associations' do
    it { should belong_to(:company_service) }
    it { should belong_to(:engineer) }
  end
end
