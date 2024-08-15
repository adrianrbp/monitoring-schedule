class CreateEngineerShifts < ActiveRecord::Migration[7.1]
  def change
    create_table :engineer_shifts do |t|
      t.references :engineer, null: false, foreign_key: true
      t.references :shift, null: false, foreign_key: true
      t.integer :start_hour
      t.integer :end_hour

      t.timestamps
    end
  end
end
