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

    CompanyServiceEngineer.create!(company_service: company_service, engineer: @engineer1)
    CompanyServiceEngineer.create!(company_service: company_service, engineer: @engineer2)
    CompanyServiceEngineer.create!(company_service: company_service, engineer: @engineer3)

  end

  describe "GET /company_services/:company_service_id/engineers?week=YYYY-WW" do
    it "renders a successful response" do
      get company_service_engineers_url(company_service_id: company_service.id, week: week),
          headers: valid_headers,
          as: :json
      expect(response).to be_successful
    end
    it 'returns the correct JSON structure' do
      get company_service_engineers_url(company_service_id: company_service.id, week: week),
          headers: valid_headers,
          as: :json
      json_response = JSON.parse(response.body)

      expect(json_response).to have_key('data')
      puts json_response
      expect(json_response['data'].length).to eq(3)
      expect(json_response['data']).to match_array([
        { 'id' => @engineer1.id, 'name' => @engineer1.name, 'color' => @engineer1.color },
        { 'id' => @engineer2.id, 'name' => @engineer2.name, 'color' => @engineer2.color },
        { 'id' => @engineer3.id, 'name' => @engineer3.name, 'color' => @engineer3.color }
      ])
      expect(json_response).to have_key('status')
      expect(json_response).to have_key('statusText')
    end
  end

end
