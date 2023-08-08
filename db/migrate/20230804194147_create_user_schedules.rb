class CreateUserSchedules < ActiveRecord::Migration[7.0]
  def change
    create_table :user_schedules do |t|
      t.references :user, null: false, foreign_key: true
      t.references :schedules, null: false, foreign_key: true

      t.timestamps
    end
  end
end
