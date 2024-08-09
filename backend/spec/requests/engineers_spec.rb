require 'rails_helper'

RSpec.describe "CompanyServices::Engineers", type: :request do
  let!(:company_service) { create(:company_service) }
  let(:week) { "2024-32" }

  let(:valid_headers) {
    {"Content-Type" => "application/json"}
  }

  before do
    @engineer1 = create(:engineer, name: "Engineer 1", color: "#a5b4fc")
    @engineer2 = create(:engineer, name: "Engineer 2", color: "#5eead4")
    @engineer3 = create(:engineer, name: "Engineer 3", color: "#bef264")
  end

  describe "GET /company_services/:company_service_id/engineers?week=YYYY-WW" do
    it "renders a successful response" do
      get company_service_engineers_url(company_service_id: company_service.id, week: week),
          headers: valid_headers,
          as: :json
      expect(response).to be_successful
    end
  end

end
