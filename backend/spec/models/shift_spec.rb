# == Schema Information
#
# Table name: shifts
#
#  id                 :bigint           not null, primary key
#  company_service_id :bigint           not null
#  week               :string
#  day                :string
#  start_time         :time
#  end_time           :time
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  start_hour         :integer
#  end_hour           :integer
#
require 'rails_helper'

RSpec.describe Shift, type: :model do
  let(:shift) { Shift.new}

  describe 'validations' do
    it 'validates presence of start_hour' do
      shift.end_hour = 10
      expect(shift).not_to be_valid
      expect(shift.errors[:start_hour]).to include("can't be blank")
    end

    it 'validates presence of end_hour' do
      shift.start_hour = 10
      expect(shift).not_to be_valid
      expect(shift.errors[:end_hour]).to include("can't be blank")
    end

    it 'validates start_hour is an integer' do
      shift.start_hour = 1.5
      shift.end_hour = 10
      expect(shift).not_to be_valid
      expect(shift.errors[:start_hour]).to include("must be an integer")
    end

    it 'validates end_hour is an integer' do
      shift.start_hour = 10
      shift.end_hour = 'ten'
      expect(shift).not_to be_valid
      expect(shift.errors[:end_hour]).to include("is not a number")
    end

    it 'validates start_hour is greater than or equal to 0' do
      shift.start_hour = -1
      shift.end_hour = 10
      expect(shift).not_to be_valid
      expect(shift.errors[:start_hour]).to include("must be greater than or equal to 0")
    end

    it 'validates end_hour is greater than or equal to 0' do
      shift.start_hour = 10
      shift.end_hour = -1
      expect(shift).not_to be_valid
      expect(shift.errors[:end_hour]).to include("must be greater than or equal to 0")
    end

    it 'validates start_hour is less than or equal to 23' do
      shift.start_hour = 24
      shift.end_hour = 10
      expect(shift).not_to be_valid
      expect(shift.errors[:start_hour]).to include("must be less than or equal to 23")
    end

    it 'validates end_hour is less than or equal to 23' do
      shift.start_hour = 10
      shift.end_hour = 24
      expect(shift).not_to be_valid
      expect(shift.errors[:end_hour]).to include("must be less than or equal to 23")
    end

    it 'is valid with valid start_hour and end_hour' do
      shift.start_hour = 10
      shift.end_hour = 20
      shift.company_service = create(:company_service)
      expect(shift).to be_valid
    end
  end

end
