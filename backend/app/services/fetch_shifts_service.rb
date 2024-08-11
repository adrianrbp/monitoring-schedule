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
        .where(week: @company_service.contract_start_week)
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
        start_time: shift.start_time.strftime("%H:%W"),
        end_time: shift.end_time.strftime("%H:%W"),
        amount_of_hours: ((shift.end_time - shift.start_time) / 1.hour).to_i,
        engineer: nil #format_engineer(shift.engineer)
      }
    end
  end

  def format_engineer(engineer)
    return nil unless engineer.present?

    {
      id: engineer.id,
      name: engineer.name,
      color: engineer.color
    }
  end
end
