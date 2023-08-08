class RemoveColumnSchedulesSchedules < ActiveRecord::Migration[7.0]
  def change
    add_column :user_groups, :status, :string

  end
end
