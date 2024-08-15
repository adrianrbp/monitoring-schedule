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
class Availability < ApplicationRecord
  belongs_to :engineer

  validates :time, inclusion: { in: 0..23, message: "must be between 0 and 23" }
end
