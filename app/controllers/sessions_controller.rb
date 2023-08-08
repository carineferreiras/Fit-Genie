class SessionsController < ApplicationController
  skip_before_action :require_user_logged_in!, only: [:create]
  def create
    @user = User.find_by(email: params[:email])

    if @user&.authenticate(params[:password])
      session[:user_id] = @user.id
      render json: { status: :ok, logged_in: true, user: { id: @user.id, firstname: @user.firstname, lastname: @user.lastname, email: @user.email, is_admin: @user.is_admin } }
    else
      render json: { status: 401, error: "Unauthorized" }
    end
  end

  def destroy
    session[:user_id] = nil
    render json: { status: :ok, logged_out: true }
  end
end
