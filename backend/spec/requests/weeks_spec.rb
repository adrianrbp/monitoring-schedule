require 'rails_helper'

RSpec.describe "Weeks", type: :request do
  let!(:company_service) { create(:company_service) }

  let(:valid_headers) {
    {"Content-Type" => "application/json"}
  }

  describe "GET /company_services/:id/weeks" do
    before {
      get company_service_weeks_path(company_service.id),
          headers: valid_headers,
          as: :json
    }

    it 'returns a success response' do
      expect(response).to have_http_status(:success)
    end

    it 'returns the correct JSON structure' do
      json_response = JSON.parse(response.body)
      expect(json_response).to have_key('data')
      expect(json_response).to have_key('status')
      expect(json_response).to have_key('statusText')

      expect(json_response['data']).to include('past', 'future')
      expect(json_response['status']).to eq(200)
      expect(json_response['statusText']).to eq("OK")
    end

  end

end
