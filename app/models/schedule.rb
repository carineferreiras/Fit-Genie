class Schedule < ApplicationRecord
  belongs_to :user
  has_many :schedule_workouts, class_name: 'ScheduleWorkout'
  has_many :workouts, through: :schedule_workouts
  validates :weekday, presence: true
  validates :weekday, numericality: { greater_than: 0 }
end