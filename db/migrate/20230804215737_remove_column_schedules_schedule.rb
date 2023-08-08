class RemoveColumnSchedulesSchedule < ActiveRecord::Migration[7.0]
  def change
    remove_column :schedules, :schedules
  end
end
