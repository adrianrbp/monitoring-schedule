require 'rails_helper'

RSpec.describe ShiftAssignmentService, type: :service do
  let(:week) { "2024-32" }
  let(:company_service) { create(:company_service,
      contract_start_week: week) }

  # Availabilities: 10
  let!(:engineer1) { create(:engineer, :with_service_and_availabilities,
                            company_service: company_service,
                            week: week,
                            name: "Engineer 1",
                            availabilities: {
                              "Monday" => (19..23).to_a, # Only Engineer 1
                              "Tuesday" => (19..23).to_a, # All 3 engineers
                            }) }
  # Availabilities: 15
  let!(:engineer2) { create(:engineer, :with_service_and_availabilities,
                            company_service: company_service,
                            week: week,
                            name: "Engineer 2",
                            availabilities: {
                              "Tuesday" => (19..23).to_a, # All 3 engineers
                              "Wednesday" => (19..23).to_a, # 2 Engineers
                              "Thursday" => (19..23).to_a, # Only Engineer 2
                            }) }
  # Availabilities: 10
  let!(:engineer3) { create(:engineer, :with_service_and_availabilities,
                            company_service: company_service,
                            week: week,
                            name: "Engineer 3",
                            availabilities: {
                              "Tuesday" => (19..23).to_a, # All 3 engineers
                              "Wednesday" => (19..23).to_a, # 2 Engineers
                            }) }
  # Total Availabilities: 35

  let!(:shifts) do
    %w[Monday Tuesday Wednesday Thursday].map do |day|
      create(:shift, day: day, start_hour: 19, end_hour: 23, week: week, company_service: company_service)
    end
  end

  describe '#assign_shifts_with_unique_availability' do
    it 'Monday: Assign only Engineer 1' do
      service = ShiftAssignmentService.new(company_service, week)
      monday_shift = shifts[0]
      service.send(:assign_shifts_with_unique_availability, monday_shift)
      assignments = service.assignments

      expect(assignments.count).to eq(1)
      expect(assignments[0][:engineer]).to eq(engineer1)
      expect(assignments[0][:start_hour]).to eq(19)
      expect(assignments[0][:end_hour]).to eq(23)
    end
    it 'Tuesday: Assign no Engineer' do
      service = ShiftAssignmentService.new(company_service, week)
      tuesday_shift = shifts[1]
      service.send(:assign_shifts_with_unique_availability, tuesday_shift)
      assignments = service.assignments

      expect(assignments.count).to eq(0)
    end
    it 'Wednesday: Assign no Engineer' do
      service = ShiftAssignmentService.new(company_service, week)
      wednesday_shift = shifts[2]
      service.send(:assign_shifts_with_unique_availability, wednesday_shift)
      assignments = service.assignments

      expect(assignments.count).to eq(0)
    end
    it 'Thursday: Assign only Engineer 2' do
      service = ShiftAssignmentService.new(company_service, week)
      thursday_shift = shifts[3]
      service.send(:assign_shifts_with_unique_availability, thursday_shift)
      assignments = service.assignments

      expect(assignments.count).to eq(1)
      expect(assignments[0][:engineer]).to eq(engineer2)
      expect(assignments[0][:start_hour]).to eq(19)
      expect(assignments[0][:end_hour]).to eq(23)
    end
  end

end
