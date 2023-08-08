class AddPreferredTurnToWorkouts < ActiveRecord::Migration[7.0]
  def change
    add_column :workouts, :preferred_turn, :integer
  end
end
