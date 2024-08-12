FactoryBot.define do
  factory :availability do
    engineer
    week { Faker::Date.forward(days: 365).strftime('%Y-%V') }
    day { %w[Monday Tuesday Wednesday Thursday Friday Saturday Sunday].sample }
    available { rand(0..23) }
  end
end
