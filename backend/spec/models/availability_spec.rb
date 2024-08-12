# == Schema Information
#
# Table name: availabilities
#
#  id          :bigint           not null, primary key
#  engineer_id :bigint           not null
#  week        :string
#  day         :string
#  time        :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
require 'rails_helper'

RSpec.describe Availability, type: :model do
  let(:engineer) { create(:engineer) }

  it "is valid with a time between 0 and 23" do
    availability = Availability.new(engineer: engineer, week: "2024-01", day: "Monday", time: 10)
    expect(availability).to be_valid
  end

  it "is invalid with a time less than 0" do
    availability = Availability.new(engineer: engineer, week: "2024-01", day: "Monday", time: -1)
    expect(availability).to_not be_valid
    expect(availability.errors[:time]).to include("must be between 0 and 23")
  end

  it "is invalid with a time greater than 23" do
    availability = Availability.new(engineer: engineer, week: "2024-01", day: "Monday", time: 24)
    expect(availability).to_not be_valid
    expect(availability.errors[:time]).to include("must be between 0 and 23")
  end
end
