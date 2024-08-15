class EngineerAvailabilityService
  def initialize(company_service_id, week)
    @company_service = CompanyService.find(company_service_id)
    @week = week
  end

  def call
    engineers = @company_service.engineers

    engineers.map do |engineer|
      {
        engineer: engineer.id,
        availability: available_times(engineer)
      }
    end
  end

  private

  def available_times(engineer)
    availability_records = engineer.availabilities.where(week: @week)

    availability_by_day = availability_records.group_by { |record| record.day }
    availability_by_day.map do |day, records|
      {
        day: day,
        availableTimes: records.map(&:time)
      }
    end
  end
end
