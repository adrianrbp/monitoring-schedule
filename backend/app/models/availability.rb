class Availability < ApplicationRecord
  belongs_to :engineer

  validates :time, inclusion: { in: 0..23, message: "must be between 0 and 23" }
end
