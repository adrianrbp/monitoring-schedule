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

    # Fase 1: Asignación inicial - horarios donde solo un ingeniero está disponible
    shifts.each do |shift|
      assign_shifts_with_unique_availability(shift)
    end

    # Fase 2: Asignación optimizada - horarios con múltiples ingenieros disponibles
    shifts.each do |shift|
      assign_shifts_with_collision(shift, 2)
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

  def assign_shifts_with_collision(shift, collision_count)
    minimum_consecutive_hours = 4
    shift_hours = (shift.start_hour...shift.end_hour).to_a

    shift_hours.each_with_index do |hour, index|
      next if assignments.any? { |a| a[:shift] == shift && a[:start_hour] == hour }

      available_engineers = availabilities[[shift.day, hour]].map(&:engineer)
      # Filter cases where availability in an hour is 2 or 3 (collision_count)
      if available_engineers.size == collision_count
        sorted_engineers = available_engineers.sort_by { |e| total_hours_assigned(e) }

        sorted_engineers.each do |engineer|
          block_start = hour
          block_end = block_start

          # Intentar extender el bloque de horas hasta donde sea posible, con un mínimo de 4 horas
          while block_end + 1 < shift.end_hour &&
                availabilities[[shift.day, block_end + 1]].map(&:engineer).include?(engineer)
            block_end += 1
          end

          # Verificar si el bloque tiene al menos 4 horas consecutivas
          if block_end - block_start + 1 >= minimum_consecutive_hours
            # Crear asignación para el bloque de horas consecutivas
            assignments << {
              engineer: engineer,
              shift: shift,
              start_hour: block_start,
              end_hour: block_end + 1
            }

            # Saltar las horas ya asignadas en el bloque
            shift_hours.slice!(index, block_end - block_start + 1)
            break
          end
        end

        # Assign 1 hour if no continuous hours
        unless shift_hours.empty?
          assignments << {
            engineer: sorted_engineers.first,
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

  def total_hours_assigned(engineer)
    assignments.select { |a| a[:engineer] == engineer }
               .sum { |a| a[:end_hour] - a[:start_hour] }
  end
end
