class AddContractWeeksToCompanyServices < ActiveRecord::Migration[7.1]
  def change
    add_column :company_services, :contract_start_week, :string
    add_column :company_services, :contract_end_week, :string
  end
end
