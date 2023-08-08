class ApplicationController < ActionController::API
  before_action :set_current_user

  before_action :require_user_logged_in!, except: [:set_current_user]

  private

  def set_current_user
    Current.user = User.find_by(id: session[:user_id]) if session[:user_id]
  end

  def require_user_logged_in!
    render json: { error: "You must be signed in to do that." }, status: :unauthorized unless Current.user
  end

  def authenticate_user
    render json: { error: "You must be signed in to do that." }, status: :unauthorized unless Current.user
  end

  def set_workout
    @workout = Workout.find_by(id: params[:workout_id])
    render json: { error: "Workout not found" }, status: :not_found unless @workout
  end

  def set_exercise
    @exercise = @workout.exercises.find_by(id: params[:id]) if @workout
    render json: { error: "Exercise not found" }, status: :not_found unless @exercise
  end

  def exercise_params
    params.require(:exercise).permit(:exercisename, :description, :duration, :repetitions, :sets, :weight)
  end

end
