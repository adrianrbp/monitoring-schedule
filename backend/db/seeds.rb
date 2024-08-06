require 'faker'

10.times do
  company_service = CompanyService.create(
    name: Faker::Company.unique.name,
    contract_start_date: Faker::Date.backward(days: 30),
    contract_end_date: Faker::Date.forward(days: 30)
  )
end