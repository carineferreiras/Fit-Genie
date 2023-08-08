class ExerciseSerializer < ActiveModel::Serializer
  attributes :id, :exercisename, :description, :duration, :repetitions, :sets, :weight

  belongs_to :workout

end
