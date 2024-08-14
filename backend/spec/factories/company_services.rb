# == Schema Information
#
# Table name: company_services
#
#  id                  :bigint           not null, primary key
#  name                :string
#  contract_start_date :datetime
#  contract_end_date   :datetime
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  contract_start_week :string
#  contract_end_week   :string
#
FactoryBot.define do
  factory :company_service do
    name { Faker::Company.unique.name }
    contract_start_week do
      start_year = Faker::Number.between(from: 2024, to: 2024)
      start_week = Faker::Number.between(from: 27, to: 35)
      "#{start_year}-#{start_week}"
    end
    contract_start_date do
      year, week = contract_start_week.split('-').map(&:to_i)
      Date.commercial(year, week).beginning_of_week
    end

    contract_end_week do
      end_year = contract_start_date.year
      end_week = Faker::Number.between(
        from: contract_start_date.cweek,
        to: contract_start_date.cweek + 8
      )
      "#{end_year}-#{end_week}"
    end
    contract_end_date do
      year, week = contract_end_week.split('-').map(&:to_i)
      Date.commercial(year, week).end_of_week
    end
  end
end
