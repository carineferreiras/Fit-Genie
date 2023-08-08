class ChangeSchedules < ActiveRecord::Migration[7.0]
  def change
    change_table :schedules do |t|
    t.references :workouts, null: true, foreign_key: true
    end
  end
end
