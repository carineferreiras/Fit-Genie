class WorkoutsController < ApplicationController

  def index
    @workouts = Workout.all
    render json: @workouts
  end

  def show
    render json: @workout
  end

  def create
    @workout = Workout.new(workout_params.except(:exercises))
    if @workout.save
      @workout.exercise_ids = workout_params[:exercises]
      render json: @workout, status: :created, location: @workout
    else
      render json: @workout.errors, status: :unprocessable_entity
    end
  end

  def update
    workout = Workout.find(id = params[:id])
    exercises = workout.exercises.where(id: params[:exercises])
    workout.exercises.delete(exercises)
    render json: workout, notice: 'Exercises removed from workout.'
  end

  def destroy
    workout = Workout.find(id = params[:id])
    print('workout', workout.id, params[:id])
    workout.destroy!
    render json: workout

  end

  private

  def workout_params
    params.require(:workout).permit(:workoutname, :preferred_turn, :duration, :muscle_group_name, :user_id, exercises: [])
  end
end