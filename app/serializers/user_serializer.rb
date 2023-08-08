class UserSerializer < ActiveModel::Serializer
  attributes :id, :firstname, :lastname, :email, :is_admin

  has_many :workouts
  has_many :schedules

end
