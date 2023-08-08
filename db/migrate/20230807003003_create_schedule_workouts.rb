class CreateScheduleWorkouts < ActiveRecord::Migration[7.0]
  def change
    create_table :schedule_workouts do |t|
      t.references :schedule, foreign_key: true
      t.references :workout, foreign_key: true

      t.timestamps
    end
  end
end
