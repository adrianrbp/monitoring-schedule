require "rails_helper"

RSpec.describe CompanyServicesController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/company_services").to route_to("company_services#index")
    end

    it "routes to #show" do
      expect(get: "/company_services/1").to route_to("company_services#show", id: "1")
    end


    it "routes to #create" do
      expect(post: "/company_services").to route_to("company_services#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/company_services/1").to route_to("company_services#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/company_services/1").to route_to("company_services#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/company_services/1").to route_to("company_services#destroy", id: "1")
    end
  end
end
