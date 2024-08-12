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

ActiveRecord::Schema[7.1].define(version: 2024_08_12_091841) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "availabilities", force: :cascade do |t|
    t.bigint "engineer_id", null: false
    t.string "week"
    t.string "day"
    t.integer "time"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["engineer_id"], name: "index_availabilities_on_engineer_id"
  end

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
    t.string "contract_start_week"
    t.string "contract_end_week"
  end

  create_table "engineer_shifts", force: :cascade do |t|
    t.bigint "engineer_id", null: false
    t.bigint "shift_id", null: false
    t.integer "start_hour"
    t.integer "end_hour"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["engineer_id"], name: "index_engineer_shifts_on_engineer_id"
    t.index ["shift_id"], name: "index_engineer_shifts_on_shift_id"
  end

  create_table "engineers", force: :cascade do |t|
    t.string "name"
    t.string "color"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "shifts", force: :cascade do |t|
    t.bigint "company_service_id", null: false
    t.string "week"
    t.string "day"
    t.time "start_time"
    t.time "end_time"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "start_hour"
    t.integer "end_hour"
    t.index ["company_service_id"], name: "index_shifts_on_company_service_id"
  end

  add_foreign_key "availabilities", "engineers"
  add_foreign_key "company_service_engineers", "company_services"
  add_foreign_key "company_service_engineers", "engineers"
  add_foreign_key "engineer_shifts", "engineers"
  add_foreign_key "engineer_shifts", "shifts"
  add_foreign_key "shifts", "company_services"
end
