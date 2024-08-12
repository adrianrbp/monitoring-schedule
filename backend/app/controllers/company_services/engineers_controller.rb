module CompanyServices
  class EngineersController < ApplicationController
    def index
      company_service = CompanyService.find(params[:company_service_id])
      week = params[:week]
      @engineers = company_service.engineers
    end

    def availability
      company_service = params[:company_service_id]
      week = params[:week]
      @availability = EngineerAvailabilityService.new(company_service, week).call
    end
  end
end