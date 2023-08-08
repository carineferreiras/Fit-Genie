

class ScheduleSerializer < ActiveModel::Serializer
  attributes :id, :user, :workouts, :weekday

  has_many :workouts
  belongs_to :user

end
