class Exercise < ApplicationRecord
  belongs_to :workout, optional: true
  validates :exercisename, :description, :duration, :repetitions, :sets, presence: true
  validates :weight, presence: true
  validates :duration, numericality: { greater_than: 0 }
end