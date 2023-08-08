module ExercisesHelper
  def find_workout
    @workout = Workout.find(params[:workout_id])
  end

  def find_exercise
    @exercise = @workout.exercises.find_by!(id: params[:id]) if @workout
  end

  def exercise_params
    params.require(:exercise).permit(:exercisename, :description, :duration, :repetitions, :sets, :weight)
  end

end

