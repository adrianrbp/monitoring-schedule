class CreateShifts < ActiveRecord::Migration[7.1]
  def change
    create_table :shifts do |t|
      t.references :company_service, null: false, foreign_key: true
      t.string :week
      t.string :day
      t.time :start_time
      t.time :end_time

      t.timestamps
    end
  end
end
