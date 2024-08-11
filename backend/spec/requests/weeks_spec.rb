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

    it 'returns the correct weeks data' do
      json_response = JSON.parse(response.body)

      expect(json_response['data']['future']).to be_an(Array)

      # Check the format of the weeks
      expect(json_response['data']['future']).to all(include('id', 'label', 'start_date', 'end_date'))

      week_identifier_format = /^\d{4}-\d{2}$/ #YYYY-WWW
      expect(json_response['data']['future']).to all(have_key('id'))
      expect(json_response['data']['future']).to all(
        include('id' => match(/^\d{4}-\d{2}$/))
      )
    end
  end

end
