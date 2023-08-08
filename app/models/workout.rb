class Workout < ApplicationRecord

  belongs_to :user
  has_many :schedule_workouts, class_name: 'ScheduleWorkout'
  has_many :schedules, through: :schedule_workouts

  has_many :exercises, dependent: :nullify

  validates :workoutname, :duration, :preferred_turn, :muscle_group_name, presence: true
  validates :duration, numericality: { greater_than: 0 }

end