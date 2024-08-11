require 'rails_helper'

RSpec.describe CompanyServices::ShiftsController, type: :routing do
  it 'routes to the shifts related to an specific company service in an specific week' do
    expect(get: '/company_services/1/shifts?week=2024-36').to route_to(
      controller: 'company_services/shifts',
      action: 'index',
      company_service_id: '1',
      week: '2024-36'
    )
  end
end

