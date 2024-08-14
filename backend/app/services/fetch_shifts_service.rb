class FetchShiftsService
  def initialize(company_service_id, week)
    @company_service = CompanyService.find(company_service_id)
    @week = week
  end

  def call
    shifts_by_day.map do |day, shifts|
      {
        day: day,
        dayLabel: formatted_day_label(day),
        time_blocks: format_time_blocks(shifts)
      }
    end
  end

  private

  def shifts_by_day
    # "Monday" => [shifts]
    @company_service.shifts
        # .where(week: @company_service.contract_start_week)
        .where(week: @week)
        .group_by(&:day)
  end

  def formatted_day_label(day)
    current_year = Date.today.year
    week_number = @week.split('-').last.to_i
    day_index = Date::DAYNAMES.index(day.capitalize)
    day_index = day_index == 0 ? 7 : day_index
    date = Date.commercial(
      current_year,
      week_number,
      day_index
    )
    # I18n.l(date, format: "%A %d de %B", locale: I18n.locale)
    I18n.l(date, format: :long, locale: :es)
  end

  def format_time_blocks(shifts)
    shifts.map do |shift|
      {
        start_time: format_time(shift.start_hour),
        end_time: format_time(shift.end_hour),
        amount_of_hours: shift.end_hour - shift.start_hour,
        engineer: nil # format_engineer(shift.engineer_shifts)
      }
    end
  end
  def format_time(hour)
    hour_string = hour.to_s.rjust(2, '0')  # Ensure the hour is two digits
    "#{hour_string}:00"
  end

  def format_engineer(engineer_shifts)
    return nil unless engineer_shifts.present?

    engineer_shifts.map do |engineer_shift|
      engineer = engineer_shift.engineer
      {
        id: engineer.id,
        name: engineer.name,
        color: engineer.color
      }
    end
  end
end
