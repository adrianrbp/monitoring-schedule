require 'faker'

10.times { FactoryBot.create(:company_service) }
puts "10 Company Services Created"

10.times { FactoryBot.create(:engineer) }
puts "10 Engineers Created"

# Assign 3 random engineers to each CompanyService and create shifts
CompanyService.all.each do |company_service|
  # Select 3 random engineers
  selected_engineers = Engineer.all.sample(3)

  # Assign selected engineers to a CompanyService
  selected_engineers.each do |engineer|
    CompanyServiceEngineer.create!(company_service: company_service, engineer: engineer)
  end

  # Create shifts for the the company
  ["2024-32", "2024-33", "2024-34"].each do |week|
    FactoryBot.create(:shift, :for_week, week: week, company_service: company_service)
  end
end
