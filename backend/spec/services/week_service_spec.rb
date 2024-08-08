require 'rails_helper'

RSpec.describe WeekService, type: :service do
  describe '.week_identifier' do
    it 'returns the correct week identifier' do
      date = Date.new(2024, 8, 5) # Lunes 5 de Agosto del 2024
      expected_identifier = "2024-32"

      result = WeekService.week_identifier(date)

      expect(result).to eq(expected_identifier)
    end
  end

  describe '.one_week' do
    it 'returns the correct week structure' do
      week_start = Date.new(2024, 8, 5) # Lunes 5 de Agosto del 2024
      week_end = week_start.end_of_week  # Domingo 11 de Agosto del 2024

      expected_week = {
        id: "2024-32",
        label: "Semana 32 del 2024",
        start_date: "05/08/2024",
        end_date: "11/08/2024"
      }

      result = WeekService.one_week(week_start, week_end)

      expect(result).to eq(expected_week)
    end
  end

  describe '.fetch_past' do
    it 'returns all past weeks until the contract start date' do
      today = Date.new(2024, 8, 5) ## Lunes 5 de Agosto del 2024
      start_date_limit = Date.new(2024, 7, 15) # Lunes 15 de Julio del 2024

      expected_past_weeks = [
        {
          id: "2024-31",
          label: "Semana 31 del 2024",
          start_date: "29/07/2024",
          end_date: "04/08/2024"
        },
        {
          id: "2024-30",
          label: "Semana 30 del 2024",
          start_date: "22/07/2024",
          end_date: "28/07/2024"
        },
        {
          id: "2024-29",
          label: "Semana 29 del 2024",
          start_date: "15/07/2024",
          end_date: "21/07/2024"
        }
      ]

      result = WeekService.fetch_past(today, start_date_limit)

      expect(result).to eq(expected_past_weeks)
    end
  end
  describe '.fetch_future' do
    context 'when there are enough weeks before the end_date_limit' do
      it 'returns 5 weeks' do
        date = Date.new(2024, 8, 15) # Jueves 15 de Agosto del 2024
        end_date_limit = Date.new(2024, 10, 31) # 31 de Octubre del 2024

        expected_future_weeks = [
          {
            id: "2024-33",
            label: "Semana 33 del 2024",
            start_date: "12/08/2024",
            end_date: "18/08/2024"
          },
          {
            id: "2024-34",
            label: "Semana 34 del 2024",
            start_date: "19/08/2024",
            end_date: "25/08/2024"
          },
          {
            id: "2024-35",
            label: "Semana 35 del 2024",
            start_date: "26/08/2024",
            end_date: "01/09/2024"
          },
          {
            id: "2024-36",
            label: "Semana 36 del 2024",
            start_date: "02/09/2024",
            end_date: "08/09/2024"
          },
          {
            id: "2024-37",
            label: "Semana 37 del 2024",
            start_date: "09/09/2024",
            end_date: "15/09/2024"
          }
        ]

        result = WeekService.fetch_future(date, end_date_limit)

        expect(result).to eq(expected_future_weeks)
      end
    end

    context 'when the end_date_limit restricts the number of weeks' do
      it 'returns only the weeks within the end_date_limit' do
        date = Date.new(2024, 8, 15) # Jueves 15 de Agosto del 2024
        end_date_limit = Date.new(2024, 9, 1)  # Domingo 1 de Setiembre del 2024

        expected_future_weeks = [
          {
            id: "2024-33",
            label: "Semana 33 del 2024",
            start_date: "12/08/2024",
            end_date: "18/08/2024"
          },
          {
            id: "2024-34",
            label: "Semana 34 del 2024",
            start_date: "19/08/2024",
            end_date: "25/08/2024"
          },
          {
            id: "2024-35",
            label: "Semana 35 del 2024",
            start_date: "26/08/2024",
            end_date: "01/09/2024"
          }
        ]

        result = WeekService.fetch_future(date, end_date_limit)

        expect(result).to eq(expected_future_weeks)
      end
    end

    context 'when the end_date_limit is very close' do
      it 'returns only one week if limit restricts it to 1 week' do
        date = Date.new(2024, 8, 15) # Jueves 15 de Agosto del 2024
        end_date_limit = Date.new(2024, 8, 18) # Only allows for 1 week

        expected_future_weeks = [
          {
            id: "2024-33",
            label: "Semana 33 del 2024",
            start_date: "12/08/2024",
            end_date: "18/08/2024"
          }
        ]

        result = WeekService.fetch_future(date, end_date_limit)

        expect(result).to eq(expected_future_weeks)
      end
    end
  end
end
