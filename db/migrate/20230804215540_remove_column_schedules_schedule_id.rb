class RemoveColumnSchedulesScheduleId < ActiveRecord::Migration[7.0]
  def change
    remove_column :schedules, :schedules_id
  end
end
