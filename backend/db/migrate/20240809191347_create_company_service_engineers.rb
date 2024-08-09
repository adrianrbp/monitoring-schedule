class CreateCompanyServiceEngineers < ActiveRecord::Migration[7.1]
  def change
    create_table :company_service_engineers do |t|
      t.references :company_service, null: false, foreign_key: true
      t.references :engineer, null: false, foreign_key: true

      t.timestamps
    end
  end
end
