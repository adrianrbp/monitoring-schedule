class WeeksController < ApplicationController
  def index
    @weeks = WeekService.new(params[:company_service_id]).call
  end
end
