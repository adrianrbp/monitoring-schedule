require "rails_helper"

RSpec.describe CompanyServicesController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/company_services").to route_to("company_services#index")
    end
  end
end
