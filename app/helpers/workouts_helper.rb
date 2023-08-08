module WorkoutsHelper
  def find_workout
    @workout = Workout.find(params[:workout_id])
  end
end