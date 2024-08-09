require 'faker'

CompanyServiceEngineer.destroy_all
CompanyService.destroy_all
Engineer.destroy_all

3.times do
  company_service = FactoryBot.create(:company_service)

  # Create engineers and associate them with the company service
  engineers = FactoryBot.create_list(:engineer, 3) # Creates 3 engineers
  engineers.each do |engineer|
    CompanyServiceEngineer.create!(
      company_service: company_service,
      engineer: engineer
    )
  end
end
puts "3 Company Services Created"
puts "9 Engineers Created"
