require 'rails_helper'

RSpec.describe ApplicationController, type: :routing do
  it "routes unmatched paths to the render_not_found action" do
    expect(get: "/unknown_path").to route_to(
        controller: "application",
        action: "render_not_found",
        unmatched: "unknown_path"
      )
  end
end