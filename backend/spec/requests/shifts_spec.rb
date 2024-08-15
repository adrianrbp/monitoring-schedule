require 'rails_helper'

RSpec.describe "CompanyServices::Shifts", type: :request do
  let(:week) { "2024-32" }
  let(:company_service) { create(:company_service,
      contract_start_week: week,
      contract_end_week: week) }

  let(:valid_headers) {
    {"Content-Type" => "application/json"}
  }
  before do
    create(:shift, company_service: company_service, week: week, day: "Monday", start_time: "09:00", end_time: "10:00")
    create(:shift, company_service: company_service, week: week, day: "Monday", start_time: "10:00", end_time: "11:00")

    create(:shift, company_service: company_service, week: week, day: "Tuesday", start_time: "18:00", end_time: "19:00")
    create(:shift, company_service: company_service, week: week, day: "Tuesday", start_time: "20:00", end_time: "21:00")

    I18n.locale = :es
    get company_service_shifts_url(company_service_id: company_service.id, week: week),
        headers: valid_headers,
        as: :json
  end

  describe "GET /index" do
    it "renders a successful response" do
      expect(response).to be_successful
    end
  end

  describe 'JSON response' do
    it 'returns the correct JSON structure' do

      json_response = JSON.parse(response.body)

      expect(json_response['status']).to eq(200)
      expect(json_response['statusText']).to eq("OK")
      expect(json_response['data']).to be_an(Array)

      # Verify structure for Monday
      monday_shifts = json_response['data'].find { |d| d['day'] == "Monday" }
      expect(monday_shifts['dayLabel']).to eq("Lunes 05 de Agosto")
      expect(monday_shifts['time_blocks'].count).to eq(2)
      expect(monday_shifts['time_blocks'][0]['engineer']).to be_nil
      expect(monday_shifts['time_blocks'][1]['engineer']).to be_nil

      # Verify that an unassigned shift has a nil engineer
      tuesday_shifts = json_response['data'].find { |d| d['day'] == "Tuesday" }
      expect(tuesday_shifts['time_blocks'][0]['engineer']).to be_nil
      expect(tuesday_shifts['time_blocks'][1]['engineer']).to be_nil
    end

  end

end
