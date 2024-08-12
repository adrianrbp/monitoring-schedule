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
class Shift < ApplicationRecord
  belongs_to :company_service

  validates :start_hour, :end_hour, presence: true
  validates :start_hour, :end_hour, numericality: {
    only_integer: true,
    greater_than_or_equal_to: 0,
    less_than_or_equal_to: 23
  }
end
