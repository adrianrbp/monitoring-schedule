# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_08_09_191347) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "company_service_engineers", force: :cascade do |t|
    t.bigint "company_service_id", null: false
    t.bigint "engineer_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["company_service_id"], name: "index_company_service_engineers_on_company_service_id"
    t.index ["engineer_id"], name: "index_company_service_engineers_on_engineer_id"
  end

  create_table "company_services", force: :cascade do |t|
    t.string "name"
    t.datetime "contract_start_date"
    t.datetime "contract_end_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "engineers", force: :cascade do |t|
    t.string "name"
    t.string "color"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "company_service_engineers", "company_services"
  add_foreign_key "company_service_engineers", "engineers"
end
