require 'rails_helper'

RSpec.describe WeeksController, type: :routing do
  describe 'routing' do
    it 'routes to the weeks index for a specific company service' do
      expect(get: '/company_services/1/weeks').to route_to(
        controller: 'weeks',
        action: 'index',
        company_service_id: '1'
      )
    end
  end
end
