class CreateCompanyServices < ActiveRecord::Migration[7.1]
  def change
    create_table :company_services do |t|
      t.string :name
      t.datetime :contract_start_date
      t.datetime :contract_end_date

      t.timestamps
    end
  end
end
