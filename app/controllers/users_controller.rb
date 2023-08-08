class UsersController < ApplicationController

  skip_before_action :require_user_logged_in!, only: [:create]

  def create
    user = User.find_by(email: user_params[:email])

    if user
      render json: { error: "User with this email already exists" }, status: :unprocessable_entity
    else
      print('user', user_params)
      user = User.create(user_params)
      if user.valid?
        session[:user_id] = user.id
        render json: user, status: :created
      else
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    end
  end

  def index
    @users = User.all
    render json: @users
  end

  def show
    render json: Current.user
  end

  def update
    user = User.find_by(id: session[:user_id])
    if user.update(user_params)
      render json: user, status: :accepted
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  #   def update
  #     @user = User.find(params[:id])
  #
  #     # Find or initialize roles based on the role_ids parameter
  #     workouts = Workout.where(id: params[:workouts_ids])
  #
  #     if @user.update(user_params)
  #       @user.workouts = workouts # Update the roles
  #       redirect_to @user, notice: 'User and roles were successfully updated.'
  #     else
  #       render :edit
  #     end
  #   end
  #
  # private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation, :firstname, :lastname, :phone_number)
  end

  def parse_request
    request.body = JSON.parse(request.body.read)
  rescue JSON::ParserError => e
    render json: { error: "Invalid JSON format" }, status: :bad_request
  end
end
