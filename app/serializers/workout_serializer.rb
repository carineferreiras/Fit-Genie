class WorkoutSerializer < ActiveModel::Serializer
  attributes :id, :exercises, :workoutname, :date, :duration, :muscle_group_name, :preferred_turn

  has_many :exercises
  belongs_to :user

end
