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
#  start_hour         :integer
#  end_hour           :integer
#

FactoryBot.define do
  factory :shift do
    company_service

    week { "#{Date.today.year}-#{Date.today.cweek}" }
    day { %w[Monday Tuesday Wednesday Thursday Friday Saturday Sunday].sample }

    start_hour { rand(0..20) }
    end_hour { rand(start_hour + 1..23) }

    start_time { Time.now.change(hour: start_hour, min: 0).strftime("%H:%M") }

    end_time do
      Time.now.change(hour: end_hour, min: 0).strftime("%H:%M")
    end
  end
end
