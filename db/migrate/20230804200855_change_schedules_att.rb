class ChangeSchedulesAtt < ActiveRecord::Migration[7.0]
  def change
    change_table :schedules do |t|
      t.references :workouts, null: true, foreign_key: true
      t.numeric :weekday
    end
  end
end
