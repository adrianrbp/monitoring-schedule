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
FactoryBot.define do
  factory :engineer do
    name { Faker::Name.name }
    color { Faker::Color.hex_color }
  end
end
