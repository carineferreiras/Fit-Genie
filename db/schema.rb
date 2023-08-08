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

ActiveRecord::Schema[7.0].define(version: 2023_08_07_003003) do
  create_table "admin_users", force: :cascade do |t|
    t.string "firstname"
    t.string "lastname"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "exercises", force: :cascade do |t|
    t.string "exercisename"
    t.text "description"
    t.integer "duration"
    t.integer "repetitions"
    t.integer "sets"
    t.string "weight"
    t.integer "workout_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["workout_id"], name: "index_exercises_on_workout_id"
  end

  create_table "schedule_workouts", force: :cascade do |t|
    t.integer "schedule_id"
    t.integer "workout_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["schedule_id"], name: "index_schedule_workouts_on_schedule_id"
    t.index ["workout_id"], name: "index_schedule_workouts_on_workout_id"
  end

  create_table "schedules", force: :cascade do |t|
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "workouts_id"
    t.decimal "weekday"
    t.index ["user_id"], name: "index_schedules_on_user_id"
    t.index ["workouts_id"], name: "index_schedules_on_workouts_id"
  end

  create_table "user_schedules", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "schedules_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["schedules_id"], name: "index_user_schedules_on_schedules_id"
    t.index ["user_id"], name: "index_user_schedules_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "firstname"
    t.string "lastname"
    t.string "email", null: false
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "is_admin", default: false
  end

  create_table "workouts", force: :cascade do |t|
    t.string "workoutname"
    t.date "date"
    t.string "duration"
    t.string "muscle_group_name"
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "schedule_id"
    t.integer "preferred_turn"
    t.index ["user_id"], name: "index_workouts_on_user_id"
  end

  add_foreign_key "exercises", "workouts"
  add_foreign_key "schedule_workouts", "schedules"
  add_foreign_key "schedule_workouts", "workouts"
  add_foreign_key "schedules", "users"
  add_foreign_key "schedules", "workouts", column: "workouts_id"
  add_foreign_key "user_schedules", "schedules", column: "schedules_id"
  add_foreign_key "user_schedules", "users"
  add_foreign_key "workouts", "users"
end
