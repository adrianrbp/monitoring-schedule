class WeeksController < ApplicationController
  def index
    @weeks_past = [{
      id: "2024-32",
      label: "Semana 32 del 2024",
      start_date: "05/08/2024",
      end_date: "11/08/2024"
    }]
    @weeks_future = [{
      id: "2024-33",
      label: "Semana 33 del 2024",
      start_date: "12/08/2024",
      end_date: "18/08/2024"
    }]
  end
end
