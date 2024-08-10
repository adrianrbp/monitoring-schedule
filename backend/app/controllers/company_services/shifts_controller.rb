module CompanyServices
  class ShiftsController < ApplicationController
    def index
      @shifts = FetchShiftsService.new(params[:company_service_id],params[:week]).call
    end
  end
end
