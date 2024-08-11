module CompanyServices
  class EngineersController < ApplicationController
    def index
      company_service = CompanyService.find(params[:company_service_id])
      week = params[:week]
      @engineers = company_service.engineers
    end
  end
end