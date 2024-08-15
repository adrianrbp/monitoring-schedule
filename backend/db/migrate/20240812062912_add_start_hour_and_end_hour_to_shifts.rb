class AddStartHourAndEndHourToShifts < ActiveRecord::Migration[7.1]
  def change
    add_column :shifts, :start_hour, :integer
    add_column :shifts, :end_hour, :integer
  end
end
