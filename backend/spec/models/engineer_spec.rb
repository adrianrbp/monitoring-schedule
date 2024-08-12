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
require 'rails_helper'

RSpec.describe Engineer, type: :model do
  describe 'associations' do
    it { should have_many(:company_service_engineers).dependent(:destroy) }
    it { should have_many(:company_services).through(:company_service_engineers) }
  end
end
