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
    # color { Faker::Color.hex_color }
    color do
      # Generate a pastel color by keeping RGB values high and saturation low
      r = rand(200..255)
      g = rand(200..255)
      b = rand(200..255)
      "#%02x%02x%02x" % [r, g, b]
    end

    trait :with_service do
      transient do
        company_service { nil }
      end

      after(:create) do |engineer, evaluator|
        if evaluator.company_service
          create(:company_service_engineer, company_service: evaluator.company_service, engineer: engineer)
        end
      end
    end

    trait :with_service_and_availabilities do
      transient do
        company_service { nil }
        week { nil }
        availabilities { {} }
      end

      after(:create) do |engineer, evaluator|
        create(:company_service_engineer, company_service: evaluator.company_service, engineer: engineer)

        evaluator.availabilities.each do |day, times|
          times.each do |time|
            create(:availability, engineer: engineer, day: day, time: time, week: evaluator.week)
          end
        end
      end
    end

  end
end
