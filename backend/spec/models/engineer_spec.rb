require 'rails_helper'

RSpec.describe Engineer, type: :model do
  describe 'associations' do
    it { should have_many(:company_service_engineers).dependent(:destroy) }
    it { should have_many(:company_services).through(:company_service_engineers) }
  end
end
