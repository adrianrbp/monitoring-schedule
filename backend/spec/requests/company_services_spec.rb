require 'rails_helper'

RSpec.describe "/company_services", type: :request do
  let!(:service_a) { create(:company_service)}
  let!(:service_b) { create(:company_service)}
  let!(:service_c) { create(:company_service)}

  let(:valid_headers) {
    {"Content-Type" => "application/json"}
  }

  describe "GET /company_services" do
    describe 'Response format' do
      context "when format is json" do
        it "returns a successful response" do
          get company_services_url, headers: valid_headers, as: :json
          expect(response).to be_successful
          expect(response.content_type).to eq("application/json; charset=utf-8")
        end
      end

      context "when format is not json" do
        it "returns a not acceptable response" do
          get company_services_url, headers: valid_headers, as: :html
          expect(response).to have_http_status(:not_acceptable)
        end
      end
    end

    describe 'Response structure' do
      it 'returns the correct JSON structure' do
        get company_services_url, headers: valid_headers, as: :json
        json_response = JSON.parse(response.body)

        expect(json_response).to have_key('data')
        expect(json_response['data'].length).to eq(3)
        expect(json_response['data']).to match_array([
          { 'id' => service_a.id, 'name' => service_a.name },
          { 'id' => service_b.id, 'name' => service_b.name },
          { 'id' => service_c.id, 'name' => service_c.name }
        ])
        expect(json_response).to have_key('status')
        expect(json_response).to have_key('statusText')
      end

      it 'returns status 200' do
        get company_services_url, headers: valid_headers, as: :json
        json_response = JSON.parse(response.body)

        expect(json_response['status']).to eq(200)
        expect(json_response['statusText']).to eq('OK')
      end
    end
  end
end
