module CompanyServices
  class EngineersController < ApplicationController
    # GET /engineers
    # GET /engineers.json
    def index
      @engineers = Engineer.all
    end
  end
end