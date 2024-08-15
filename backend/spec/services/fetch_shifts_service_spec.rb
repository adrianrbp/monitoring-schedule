require 'rails_helper'

RSpec.describe FetchShiftsService, type: :service do
  let(:week) { "2024-32" }
  let(:company_service) { create(:company_service,
      contract_start_week: week,
      contract_end_week: week) }
  let(:service) { FetchShiftsService.new(company_service.id, week) }

  describe '#call' do
    context 'when there are shifts for the week' do
      let!(:shift1) { create(:shift, company_service: company_service, week: week,
          day: 'Monday', start_hour: 9, end_hour: 12) }
      let!(:shift2) { create(:shift, company_service: company_service, week: week,
          day: 'Monday', start_hour: 14, end_hour: 18) }
      let!(:shift3) { create(:shift, company_service: company_service, week: week,
          day: 'Tuesday', start_hour: 9, end_hour: 11) }

      it 'returns formatted shift data grouped by day' do
        result = service.call

        expect(result).to be_an(Array)
        expect(result.size).to eq(2)  # Monday and Tuesday

        monday = result.find { |day_data| day_data[:day] == 'Monday' }
        tuesday = result.find { |day_data| day_data[:day] == 'Tuesday' }

        expect(monday[:dayLabel]).to eq('Lunes 05 de Agosto')  # Adjust this label depending on the exact date of the week 32
        expect(monday[:time_blocks].size).to eq(2)
        expect(monday[:time_blocks].first[:start_time]).to eq('09:00')
        expect(monday[:time_blocks].first[:end_time]).to eq('12:00')
        expect(monday[:time_blocks].first[:amount_of_hours]).to eq(3)

        expect(tuesday[:dayLabel]).to eq('Martes 06 de Agosto')
        expect(tuesday[:time_blocks].size).to eq(1)
        expect(tuesday[:time_blocks].first[:start_time]).to eq('09:00')
        expect(tuesday[:time_blocks].first[:end_time]).to eq('11:00')
        expect(tuesday[:time_blocks].first[:amount_of_hours]).to eq(2)
      end
    end

    context 'when there are no shifts for the week' do
      it 'returns an empty array' do
        result = service.call
        expect(result).to eq([])
      end
    end

    context 'when formatting the day label' do
      let!(:shift) { create(:shift, company_service: company_service, week: week, day: 'Wednesday', start_time: '09:00', end_time: '17:00') }

      it 'returns the correct day label in Spanish' do
        result = service.call
        wednesday = result.find { |day_data| day_data[:day] == 'Wednesday' }

        expect(wednesday[:dayLabel]).to eq('Miércoles 07 de Agosto')  # Adjust based on actual week date
      end
    end
  end
end
