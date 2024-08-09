# spec/requests/errors_spec.rb
require 'rails_helper'

RSpec.describe "Error Handling", type: :request do
  describe 'GET /unknown' do
    context "when format is json" do
      it 'returns a 404 Not Found' do
        get '/unknown', as: :json
        expect(response).to have_http_status(:not_found)
        expect(response.body).to include('Not Found')
      end
    end

    context "when format is not json" do
      it 'returns a not acceptable response' do
        get '/unknown', as: :html
        expect(response).to have_http_status(:not_acceptable)
      end
    end
  end
end
