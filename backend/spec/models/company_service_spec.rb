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
#  contract_start_week :string
#  contract_end_week   :string
#
require 'rails_helper'

RSpec.describe CompanyService, type: :model do
  describe 'associations' do
    it { should have_many(:company_service_engineers).dependent(:destroy) }
    it { should have_many(:engineers).through(:company_service_engineers) }
  end
end
