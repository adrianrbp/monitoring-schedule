require 'rails_helper'

RSpec.describe EngineerShift, type: :model do
  it 'validates presence of start_hour and end_hour' do
    model = build(:engineer_shift, start_hour: nil, end_hour: nil)
    expect(model).not_to be_valid
    expect(model.errors[:start_hour]).to include("can't be blank")
    expect(model.errors[:end_hour]).to include("can't be blank")
  end

  it 'validates numericality and range of start_hour and end_hour' do
    model = build(:engineer_shift, start_hour: 24, end_hour: -1)
    expect(model).not_to be_valid
    expect(model.errors[:start_hour]).to include('must be less than or equal to 23')
    expect(model.errors[:end_hour]).to include('must be greater than or equal to 0')
  end
  it 'is valid with start_hour and end_hour within range' do
    model = build(:engineer_shift, start_hour: 9, end_hour: 17)
    expect(model).to be_valid
  end
end
