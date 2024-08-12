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
FactoryBot.define do
  factory :availability do
    engineer
    week { Faker::Date.forward(days: 365).strftime('%Y-%V') }
    day { %w[Monday Tuesday Wednesday Thursday Friday Saturday Sunday].sample }
    available { rand(0..23) }
  end
end
