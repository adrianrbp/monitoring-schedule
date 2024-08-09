module CompanyServices
  class EngineersController < ApplicationController
    # GET /engineers
    # GET /engineers.json
    def index
      puts "REACH CONTROLLER"
      @engineers = Engineer.all
    end
  end
end