class User < ApplicationRecord

    has_secure_password
    has_many :workouts
    has_many :schedules
    validates :firstname, :lastname, presence: true
    validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP, message: "must be a valid email address" }
    validates :is_admin, presence:false
    validates :password, length: { in: 8..30 }, presence: true, on: :create

end

  