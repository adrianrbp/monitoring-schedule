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
require 'rails_helper'

RSpec.describe CompanyService, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
