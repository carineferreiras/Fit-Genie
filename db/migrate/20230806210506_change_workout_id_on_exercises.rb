class ChangeWorkoutIdOnExercises < ActiveRecord::Migration[6.0]
  def change
    change_column_null :exercises, :workout_id, true
  end
end
