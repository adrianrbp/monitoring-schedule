require 'rails_helper'

RSpec.describe CompanyServices::EngineersController, type: :routing do
  it 'routes to the engineers availabilities that are assigned to an specific company service' do
    expect(get: '/company_services/1/engineers/availability?week=2024-36').to route_to(
      controller: 'company_services/engineers',
      action: 'availability',
      company_service_id: '1',
      week: '2024-36'
    )
  end
end

