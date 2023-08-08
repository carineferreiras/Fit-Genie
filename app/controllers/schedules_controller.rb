class SchedulesController < ApplicationController
  def add_schedule
    user_to_change = User.find(params[:id])
    workout = Workout.find(params[:workout_id])

    schedule = Schedule.find_by(user_id: user_to_change.id, weekday: params[:weekday])
    if schedule
      print('existed')

      schedule.workouts << workout
      schedule.save!
      render json: schedule, notice: 'Your schedule successfully updated.'
    else
      print('new')

      new_schedule = Schedule.create!(user_id: user_to_change.id, weekday: params[:weekday])
      new_schedule.workouts << workout
      new_schedule.save!

      render json: new_schedule, notice: 'A new schedule was created.'
    end
  end

  def remove_schedule
    schedule = Schedule.find(params[:id])
    schedule.workouts = []
    schedule.save!

    render json: schedule, notice: 'Workouts was cleared.'
  end
end