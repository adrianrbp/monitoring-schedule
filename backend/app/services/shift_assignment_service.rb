class ShiftAssignmentService
  attr_reader :company_service, :week, :availabilities, :assignments

  def initialize(company_service, week)
    @company_service = company_service
    @week = week
    @availabilities = load_availabilities
    @assignments = []
  end

  def assign_shifts
    shifts = Shift.where(company_service: company_service, week: week)

    # Fase 1: Asignación inicial en horarios donde solo un ingeniero está disponible
    shifts.each do |shift|
      assign_shifts_with_unique_availability(shift)
    end

    save_assignments(assignments)
  end

  private


  def load_availabilities
    Availability.where(week: week)
                .includes(:engineer)
                .group_by { |a| [a.day, a.time] }
  end


  def assign_shifts_with_unique_availability(shift)
    (shift.start_hour...shift.end_hour).each do |hour|
      available_engineers = availabilities[[shift.day, hour]].map(&:engineer)
      puts "#{shift.day}#{hour}"
      puts "eng: #{available_engineers.size} -> #{available_engineers.first.name}"
      puts availabilities.count

      if available_engineers.size == 1
        engineer = available_engineers.first

        last_assignment = assignments.last

        if last_assignment && last_assignment[:engineer] == engineer && last_assignment[:shift] == shift && last_assignment[:end_hour] == hour
          # Extend the end hour of the existing assignment
          last_assignment[:end_hour] = hour + 1
        else
          assignments << {
            engineer: engineer,
            shift: shift,
            start_hour: hour,
            end_hour: hour + 1
          }
        end
      end
    end
  end


  def save_assignments(assignments)
    EngineerShift.transaction do
      assignments.each do |assignment|
        EngineerShift.create!(
          engineer: assignment[:engineer],
          shift: assignment[:shift],
          start_hour: assignment[:start_hour],
          end_hour: assignment[:end_hour]
        )
      end
    end
  end

end
