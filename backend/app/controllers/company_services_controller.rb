class CompanyServicesController < ApplicationController
  before_action :set_company_service, only: %i[ show update destroy ]

  # GET /company_services
  # GET /company_services.json
  def index
    @company_services = CompanyService.all
  end

  # GET /company_services/1
  # GET /company_services/1.json
  def show
  end

  # POST /company_services
  # POST /company_services.json
  def create
    @company_service = CompanyService.new(company_service_params)

    if @company_service.save
      render :show, status: :created, location: @company_service
    else
      render json: @company_service.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /company_services/1
  # PATCH/PUT /company_services/1.json
  def update
    if @company_service.update(company_service_params)
      render :show, status: :ok, location: @company_service
    else
      render json: @company_service.errors, status: :unprocessable_entity
    end
  end

  # DELETE /company_services/1
  # DELETE /company_services/1.json
  def destroy
    @company_service.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_company_service
      @company_service = CompanyService.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def company_service_params
      params.require(:company_service).permit(:name, :contract_start_date, :contract_end_date)
    end
end
