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

    start_time {
      Faker::Time.between(
        from: DateTime.now.change(hour: 04, min: 00),
        to: DateTime.now.change(hour: 20, min: 00)
      ).change(min: 0)
        .strftime("%H:%M")
    }
    end_time do
      start_time_time = Time.parse(start_time)
      plus_one_hour = start_time_time + 1.hour
      midnight = start_time_time.end_of_day
      end_time_range = (plus_one_hour)..(midnight)

      Faker::Time.between(
        from: end_time_range.first,
        to: end_time_range.last
      ).change(min: 0)
        .strftime("%H:%M")
    end
  end
end