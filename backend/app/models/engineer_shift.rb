class EngineerShift < ApplicationRecord
  belongs_to :engineer
  belongs_to :shift

  validates :start_hour, :end_hour, presence: true
  validates :start_hour, :end_hour, numericality: {
    only_integer: true,
    greater_than_or_equal_to: 0,
    less_than_or_equal_to: 23
  }
end
