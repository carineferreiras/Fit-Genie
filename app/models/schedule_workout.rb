# app/models/schedule_workout.rb
class ScheduleWorkout < ApplicationRecord
  belongs_to :schedule
  belongs_to :workout
end