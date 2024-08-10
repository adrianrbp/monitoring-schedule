class WeekService
  def initialize(company_service_id)
    company_service = CompanyService.find(company_service_id)
    @start_date = company_service.contract_start_date.to_date
    @end_date = company_service.contract_end_date.to_date
  end

  def call
    current_date = Date.today
    past_weeks = []
    future_weeks = []

    # binding.pry
    if date_in_contract?(@start_date, @end_date, current_date)
      past_weeks = fetch_past(current_date, @start_date)
      future_weeks = fetch_future(current_date, @end_date)
    elsif current_date < @start_date
      future_weeks = fetch_future(@start_date, @end_date, offset: true)
    elsif current_date > @end_date
      past_weeks = fetch_past(@end_date, @start_date)
    end
    { past: past_weeks, future: future_weeks }
  end

  private
  def date_in_contract?(start_date, end_date, date)
    # service.contract_start_date <= date && date <= service.contract_end_date
    (start_date..end_date).cover?(date)
  end

  def week_identifier(date)
    "#{date.year}-#{date.cweek}"
  end

  def one_week(week_start, week_end)
    {
      id: week_identifier(week_start),
      label: "Semana #{week_start.cweek} del #{week_start.year}",
      start_date: week_start.strftime('%d/%m/%Y'),
      end_date: week_end.strftime('%d/%m/%Y')
    }
  end

  def fetch_past(end_date, start_date_limit)
    first_monday = start_date_limit.beginning_of_week
    weeks = []
    mondays = [end_date.beginning_of_week]
    while mondays.last > first_monday
      week_start = mondays.last.last_week
      week_end = week_start.end_of_week
      weeks << one_week(week_start, week_end)
      mondays << week_start
    end
    weeks
  end

  def fetch_future(start_date, end_date_limit, offset: false)
    weeks = []
    week_start = offset ? Date.today.beginning_of_week : start_date.beginning_of_week
    weeks_limit = 5
    while weeks.count < weeks_limit && week_start <= end_date_limit
      if offset && week_start < start_date.beginning_of_week
        week_start = week_start.next_week
        weeks_limit -= 1
        next
      end
      week_end = week_start.end_of_week
      weeks << one_week(week_start, week_end)
      week_start = week_start.next_week
    end

    weeks
  end

end