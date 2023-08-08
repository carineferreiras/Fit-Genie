class ExercisesController < ApplicationController

  before_action :set_exercise, only: [:show, :update, :destroy]
  before_action :set_workout, only: [:index, :create]

  def get_all_exercises
    exercises_list = Exercise.all()
    render json: exercises_list
  end

  def index
    @exercises = @workout.exercises
    render json: @exercises
  end

  def show
    render json: @exercise
  end

  def create
    @exercise = @workout.exercises.new(exercise_params)
    if @exercise.save
      render json: @exercise, status: :created, location: exercise_url(@exercise)
    else
      render json: @exercise.errors, status: :unprocessable_entity
    end
  end

  def create_new_exercise
    new_exercise = Exercise.create(exercise_params)
    if new_exercise.save
      render json: new_exercise
    else
      render json: new_exercise.errors, status: :unprocessable_entity
    end
  end

  def remove_exercise
    exercise = Exercise.find(id=params[:id])
    if exercise
      exercise.destroy!
      print('done', exercise)

      render json: exercise
    else
      render json: exercise.errors, status: :unprocessable_entity
    end
  end

  def update
    if @exercise.update(exercise_params)
      render json: @exercise
    else
      render json: @exercise.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @exercise.destroy
  end

  private

  def set_workout
    @workout = Workout.find(params[:workout_id])
  end

  def set_exercise
    @exercise = @workout.exercises.find(params[:id])
  end

  def exercise_params
    params.require(:exercise).permit(:exercisename, :description, :duration, :repetitions, :sets, :weight)
  end
end
