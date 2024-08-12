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
  puts "Assigned 3 Engineers to #{company_service.name}"

  puts "Get 1st week of #{company_service.name}"
  # Get the start and end weeks from the company_service
  start_week = company_service.contract_start_week
  # end_week = company_service.contract_end_week
  puts "Create Shift Week for #{company_service.name}"
  week_days = %w[Monday Tuesday Wednesday Thursday Friday Saturday Sunday]
  # start_time = Time.parse("09:00")

  week_days.each do |day|
    shift = FactoryBot.create(:shift,
            company_service: company_service,
            week: start_week,
            day: day)
    # start_time += 1.day

    puts "Created Shift for #{day} in #{company_service.name}: #{shift.start_hour}:00 - #{shift.end_hour}:00"

    # Create availabilities for each engineer based on the shift hour ranges
    selected_engineers.each do |engineer|
      # Generate random start hour for 3-hour blocks
      available_hours = []

      # Create groups of 3 hours randomly distributed
      (shift.start_hour...shift.end_hour).each do |hour|
        if hour <= (shift.end_hour - 3)
          available_hours << hour
        end
      end

      # Randomly select 3-hour blocks from available hours
      selected_hours = available_hours
          .sample(available_hours.length / 3)
          .map { |hour| [hour, hour + 1, hour + 2] }
          .flatten.uniq

      selected_hours.each do |hour|
        FactoryBot.create(:availability,
                           engineer: engineer,
                           week: start_week,
                           day: day,
                           time: hour)
      end

      puts "Created availability for Engineer #{engineer.id} for #{day}: #{selected_hours.join(', ')}"
    end

  end
end
