require 'rails_helper'

RSpec.describe "/company_services", type: :request do
  let!(:service_a) { create(:company_service)}
  let!(:service_b) { create(:company_service)}
  let!(:service_c) { create(:company_service)}

  let(:valid_headers) {
    {"Content-Type" => "application/json"}
  }

  describe "GET /index" do
    it "renders a successful response" do
      get company_services_url, headers: valid_headers, as: :json
      expect(response).to be_successful
    end
  end

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
