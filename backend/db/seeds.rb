require 'faker'

CompanyService.destroy_all
Engineer.destroy_all

10.times { FactoryBot.create(:company_service) }
puts "10 Company Services Created"

10.times { FactoryBot.create(:engineer) }
puts "10 Engineers Created"
