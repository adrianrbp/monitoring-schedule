FactoryBot.define do
  factory :engineer_shift do
    engineer
    shift
    start_hour { rand(0..20) }
    end_hour { rand(start_hour + 1..23) }
  end
end
