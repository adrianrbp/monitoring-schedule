require 'rails_helper'

RSpec.describe WeekService, type: :service do
  let(:company_service) { create(:company_service,
      contract_start_date: '2024-07-15',
      contract_end_date: '2024-09-15')
    }
  let(:service) { WeekService.new(company_service.id) }

  describe '#call generates weeks data based on contract' do
    before do
      # Monday, 5 of August, 2024 - Week: 32
      allow(Date).to receive(:today).and_return(Date.new(2024, 8, 5))
    end
    describe 'week identifier' do
      it 'returns the current week 32 identifier within the future weeks' do
        # .week_identifier
        result = service.call
        future_weeks = result[:future]

        expect(future_weeks).to include(
          a_hash_including(id: "2024-32")
        )
      end
    end

    describe 'Single Week' do
      it 'returns the correct week structure for the past and future' do
        result = service.call
        past_weeks = result[:past]
        future_weeks = result[:future]

        expect(past_weeks).to include(
          a_hash_including(
            id: "2024-31",
            label: "Semana 31 del 2024",
            start_date: "29/07/2024",
            end_date: "04/08/2024"
          )
        )

        expect(future_weeks).to include(
          a_hash_including(
            id: "2024-32",
            label: "Semana 32 del 2024",
            start_date: "05/08/2024",
            end_date: "11/08/2024"
          )
        )
      end
    end

    context 'Contract Range: 15Jul -> 15 Set 2024 - W29-W37 = 8 weeks' do
      describe 'Past Weeks' do
        it 'returns all past weeks until the contract start date' do
          result = service.call
          past_weeks = result[:past]

          expect(past_weeks).to eq([
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
          ])
        end
      end

      describe 'Future Weeks' do
        it 'returns the correct 5 future weeks based on end_date_limit' do
          result = service.call
          future_weeks = result[:future]

          expect(future_weeks).to eq([
            {
              id: "2024-32",
              label: "Semana 32 del 2024",
              start_date: "05/08/2024",
              end_date: "11/08/2024"
            },
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
            }
          ])
        end

        it 'returns fewer future weeks when the end_date_limit is close' do
          # go 1 week in the future - get closer to end date
          allow(Date).to receive(:today).and_return(Date.new(2024, 8, 26))

          result = service.call
          future_weeks = result[:future]

          expect(future_weeks).to eq([
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
          ])
        end

        it 'returns only one week when its the last week of contract' do
          # go to the future - last week of contract
          allow(Date).to receive(:today).and_return(Date.new(2024, 9, 9))

          result = service.call
          future_weeks = result[:future]

          expect(future_weeks).to eq([
            {
              id: "2024-37",
              label: "Semana 37 del 2024",
              start_date: "09/09/2024",
              end_date: "15/09/2024"
            }
          ])
        end
        it 'returns all weeks that enter on 5 weeks range when the current date a bit far in future' do
          # go to the past - contract dates still in future
          allow(Date).to receive(:today).and_return(Date.new(2024, 07, 1))
          result = service.call
          past_weeks = result[:past]
          future_weeks = result[:future]
          expect(past_weeks.count).to eq(0)
          expect(future_weeks.count).to eq(3)
        end
      end
    end
  end
end
