class WeeksController < ApplicationController
  def index
    @weeks = WeekService.generate_weeks_data(params[:company_service_id])
  end
end
