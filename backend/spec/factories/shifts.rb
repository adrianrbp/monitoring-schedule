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

FactoryBot.define do
  factory :shift do
    company_service

    week { "#{Date.today.year}-#{Date.today.cweek}" }
    day { %w[Monday Tuesday Wednesday Thursday Friday Saturday Sunday].sample }

    start_time { Faker::Time.between(from: DateTime.now.beginning_of_day, to: DateTime.now.end_of_day).change(min: 0).strftime("%H:%M") }
    end_time do
      duration_in_hours = rand(3..10)
      (Time.parse(start_time) + duration_in_hours.hours).strftime("%H:%M")
    end

    trait :for_week do |week|
      after(:create) do |shift, evaluator|
        week_days = %w[Monday Tuesday Wednesday Thursday Friday Saturday Sunday]
        start_time = Time.parse("09:00")

        week_days.each do |day|
          # Create shifts for the entire week
          shift_for_day = create(:shift,
              company_service: shift.company_service,
              week: week,
              day: day,
              start_time: start_time.strftime("%H:%M"),
              end_time: (start_time + rand(3..10).hours).strftime("%H:%M"))
        end
      end
    end
  end
end