class AddScheduleIdToWorkouts < ActiveRecord::Migration[7.0]
  def change
    add_column :workouts, :schedule_id, :integer
  end
end
