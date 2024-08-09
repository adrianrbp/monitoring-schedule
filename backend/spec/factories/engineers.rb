FactoryBot.define do
  factory :engineer do
    name { Faker::Name.name }
    color { Faker::Color.hex_color }
  end
end
